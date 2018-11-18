import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { CreateScoreSheetTemplateRequest, CreateScoreSheetTemplateResponse, ScoreSheetTemplate, ScoreSheetTemplateSection } from "./generated/robocup_pb";
import { RobocupClient } from "./generated/robocup_pb_service"

interface IScoreSheetTemplateSection {
  title: string
  description: string
  maxValue: number
  multiplier: number
}

interface IScoreSheetTemplate {
  name: string
  type: string
  timings: string[]
  sections: IScoreSheetTemplateSection[]
}

interface IScoreSheetTemplateNewState {
  newTemplate: IScoreSheetTemplate
  timingText: string
}

export default class ScoreSheetTemplateNew extends React.Component<RouteComponentProps<{}>, IScoreSheetTemplateNewState> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      newTemplate: {
        name: "",
        sections: [],
        timings: [],
        type: "Interview",
      },
      timingText: ""
    }
    this.addSection = this.addSection.bind(this);
    this.removeSection = this.removeSection.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.updateSection = this.updateSection.bind(this);
    this.save = this.save.bind(this);
    this.updateCurrentTimingText = this.updateCurrentTimingText.bind(this);
    this.addTiming = this.addTiming.bind(this);
    this.saveGrpc = this.saveGrpc.bind(this);
  }

  public updateCurrentTimingText(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      timingText: event.currentTarget.value,
    })
  }

  public addTiming(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      newTemplate: Object.assign({}, this.state.newTemplate, {
        timings: [...this.state.newTemplate.timings, this.state.timingText],
      }),
      timingText: ""
    });
  }

  public addSection(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      newTemplate: Object.assign({}, this.state.newTemplate, {
        sections: [...this.state.newTemplate.sections, {
          description: "",
          maxValue: 0,
          multiplier: 1,
          title: ""
        }],
      })
    })
  }

  public removeSection(event: React.MouseEvent<HTMLButtonElement>) {
    const parts = event.currentTarget.id.split("-");
    const index = parseInt(parts[parts.length - 1], 10);
    this.setState({
      newTemplate: Object.assign({}, this.state.newTemplate, {
        sections: this.state.newTemplate.sections.filter((item, sIndex) => {
          return sIndex !== index;
        })
      })
    })
  }

  public updateTemplate(event: React.FormEvent<HTMLInputElement>) {
    const newTemplate = Object.assign({}, this.state.newTemplate);
    if (event.currentTarget.id === "template-name") {
      newTemplate.name = event.currentTarget.value;
    } else if (event.currentTarget.id === "template-type") {
      newTemplate.type = event.currentTarget.value;
    }
    this.setState({
      newTemplate
    });
  }

  public updateSection(event: React.FormEvent<HTMLInputElement>) {
    const parts = event.currentTarget.id.split("-");
    const index = parseInt(parts[parts.length - 1], 10);
    const updatedSection = Object.assign({}, this.state.newTemplate.sections[index]);
    if (parts[1] === "title") {
      updatedSection.title = event.currentTarget.value;
    } else if (parts[1] === "description") {
      updatedSection.description = event.currentTarget.value;
    } else if (parts[1] === "value") {
      updatedSection.maxValue = parseInt(event.currentTarget.value, 10);
    } else if (parts[1] === "multiplier") {
      updatedSection.multiplier = parseInt(event.currentTarget.value, 10);
    }
    this.setState({
      newTemplate: Object.assign({}, this.state.newTemplate, {
        sections: this.state.newTemplate.sections.map((section, sIndex) => {
          if (sIndex === index) {
            return updatedSection;
          }
          return section;
        })
      })
    })
  }

  public saveGrpc() {
    const req = new CreateScoreSheetTemplateRequest();
    const protoTemp = new ScoreSheetTemplate();
    protoTemp.setName(this.state.newTemplate.name);
    if (this.state.newTemplate.type === "Interview") {
      protoTemp.setType(ScoreSheetTemplate.Type.INTERVIEW);
    } else {
      protoTemp.setType(ScoreSheetTemplate.Type.PERFORMANCE);
    }
    this.state.newTemplate.timings.forEach((timing) => {
      protoTemp.addTimings(timing);
    })
    this.state.newTemplate.sections.forEach((section) => {
      const protoSection = new ScoreSheetTemplateSection();
      protoSection.setDescription(section.description);
      protoSection.setMaxValue(section.maxValue);
      protoSection.setMultiplier(section.multiplier);
      protoSection.setTitle(section.title);
      protoTemp.addSections(protoSection);
    })
    req.setScoreSheetTemplate(protoTemp);
    const client = new RobocupClient("");
    client.createScoreSheetTemplate(req, (err, resp) => {
      if ((resp === null) || (resp === undefined)) {
        return;
      }
      this.props.history.goBack();
    })
  }

  public save() {
    return fetch("/api/score_sheet_template", {
      body: JSON.stringify(this.state.newTemplate),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    })
  }

  public render() {
    const self = this;
    return [(
      <Row key={0}>
        <Col md="4">
          <h3>New Score Sheet Template</h3>
        </Col>
      </Row>
    ), (
      <Form key={1}>
        <FormGroup row={true}>
          <Label for="name" sm={2} style={{ textAlign: "right" }}>Name</Label>
          <Col sm={4}>
            <Input type="text" name="name" id="template-name" value={this.state.newTemplate.name} onChange={self.updateTemplate} />
          </Col>
          <Label for="sheet-type" sm={2} style={{ textAlign: "right" }}>Sheet Type</Label>
          <Col sm={4}>
            <Input type="select" name="template-type" id="template-type" value={self.state.newTemplate.type} onChange={self.updateTemplate}>
              <option value="Interview">Interview</option>
              <option value="Performance">Performance</option>
            </Input>
          </Col>
        </FormGroup>
        <Row>
          <Col md="4">
            <h3>Timings</h3>
          </Col>
        </Row>
        <Row>
          <Col md="10">
            <Input type="text" name="timing-name" id="score-sheet-timing" onChange={self.updateCurrentTimingText} value={self.state.timingText} />
          </Col>
          <Col md="2" style={{ textAlign: "right" }}>
            <Button color="primary" size="sm" onClick={self.addTiming}>Add Timing</Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Table>
              <thead>
                <tr>
                  <th>Timing Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.newTemplate.timings.map((timing, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {timing}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <h3>Sections</h3>
          </Col>
          <Col md="4" />
          <Col md="4" style={{ textAlign: "right" }}>
            <Button color="primary" size="sm" onClick={self.addSection}>Add Section</Button>
          </Col>
        </Row>
        {
          this.state.newTemplate.sections.map((section, index) => {
            return (
              <Form key={`section-${index}`}>
                <FormGroup row={true}>
                  <Label sm={2}>Title</Label>
                  <Col sm={10}>
                    <Input type="text" id={`section-title-${index}`} value={section.title} placeholder="Section Title/Category" onChange={self.updateSection} />
                  </Col>
                </FormGroup>
                <FormGroup row={true}>
                  <Label sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input type="textarea" id={`section-description-${index}`} value={section.description} onChange={self.updateSection} />
                  </Col>
                </FormGroup>
                <FormGroup row={true}>
                  <Label sm={2}>Max Value</Label>
                  <Col sm={4}>
                    <Input type="number" id={`section-value-${index}`} value={section.maxValue} onChange={self.updateSection} />
                  </Col>
                  <Label sm={2}>Multiplier</Label>
                  <Col sm={4}>
                    <Input type="number" id={`section-multiplier-${index}`} value={section.multiplier} onChange={self.updateSection} />
                  </Col>
                </FormGroup>
              </Form>
            );
          })
        }
        <Row>
          <Col md="12" style={{ textAlign: "right" }}>
            <Button color="primary" size="sm" onClick={self.saveGrpc}>Save</Button>
          </Col>
        </Row>
      </Form>
    )]
  }
}
