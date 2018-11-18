// package: 
// file: robocup.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Division extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getLeague(): Division.League;
  setLeague(value: Division.League): void;

  getCompetitionRounds(): number;
  setCompetitionRounds(value: number): void;

  getFinalRounds(): number;
  setFinalRounds(value: number): void;

  getInterviewTemplateId(): string;
  setInterviewTemplateId(value: string): void;

  getPerformanceTemplateId(): string;
  setPerformanceTemplateId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Division.AsObject;
  static toObject(includeInstance: boolean, msg: Division): Division.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Division, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Division;
  static deserializeBinaryFromReader(message: Division, reader: jspb.BinaryReader): Division;
}

export namespace Division {
  export type AsObject = {
    id: string,
    name: string,
    league: Division.League,
    competitionRounds: number,
    finalRounds: number,
    interviewTemplateId: string,
    performanceTemplateId: string,
  }

  export enum League {
    ONSTAGE = 0,
    RESCUE = 1,
    SOCCER = 2,
  }
}

export class Institution extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Institution.AsObject;
  static toObject(includeInstance: boolean, msg: Institution): Institution.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Institution, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Institution;
  static deserializeBinaryFromReader(message: Institution, reader: jspb.BinaryReader): Institution;
}

export namespace Institution {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class Member extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getGender(): Member.Gender;
  setGender(value: Member.Gender): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Member.AsObject;
  static toObject(includeInstance: boolean, msg: Member): Member.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Member, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Member;
  static deserializeBinaryFromReader(message: Member, reader: jspb.BinaryReader): Member;
}

export namespace Member {
  export type AsObject = {
    id: string,
    name: string,
    gender: Member.Gender,
  }

  export enum Gender {
    UNSPECIFIED = 0,
    MALE = 1,
    FEMALE = 2,
  }
}

export class Team extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  hasInstitution(): boolean;
  clearInstitution(): void;
  getInstitution(): Institution | undefined;
  setInstitution(value?: Institution): void;

  getDivision(): string;
  setDivision(value: string): void;

  getImportId(): string;
  setImportId(value: string): void;

  clearMembersList(): void;
  getMembersList(): Array<Member>;
  setMembersList(value: Array<Member>): void;
  addMembers(value?: Member, index?: number): Member;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Team.AsObject;
  static toObject(includeInstance: boolean, msg: Team): Team.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Team, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Team;
  static deserializeBinaryFromReader(message: Team, reader: jspb.BinaryReader): Team;
}

export namespace Team {
  export type AsObject = {
    id: string,
    name: string,
    institution?: Institution.AsObject,
    division: string,
    importId: string,
    membersList: Array<Member.AsObject>,
  }
}

export class GetDivisionsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDivisionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDivisionsRequest): GetDivisionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDivisionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDivisionsRequest;
  static deserializeBinaryFromReader(message: GetDivisionsRequest, reader: jspb.BinaryReader): GetDivisionsRequest;
}

export namespace GetDivisionsRequest {
  export type AsObject = {
  }
}

export class GetDivisionsResponse extends jspb.Message {
  clearDivisionsList(): void;
  getDivisionsList(): Array<Division>;
  setDivisionsList(value: Array<Division>): void;
  addDivisions(value?: Division, index?: number): Division;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDivisionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDivisionsResponse): GetDivisionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDivisionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDivisionsResponse;
  static deserializeBinaryFromReader(message: GetDivisionsResponse, reader: jspb.BinaryReader): GetDivisionsResponse;
}

export namespace GetDivisionsResponse {
  export type AsObject = {
    divisionsList: Array<Division.AsObject>,
  }
}

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getIsAdmin(): boolean;
  setIsAdmin(value: boolean): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    name: string,
    username: string,
    isAdmin: boolean,
    password: string,
  }
}

export class GetUsersRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersRequest): GetUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersRequest;
  static deserializeBinaryFromReader(message: GetUsersRequest, reader: jspb.BinaryReader): GetUsersRequest;
}

export namespace GetUsersRequest {
  export type AsObject = {
  }
}

export class GetUsersResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): void;
  addUsers(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUsersResponse): GetUsersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUsersResponse;
  static deserializeBinaryFromReader(message: GetUsersResponse, reader: jspb.BinaryReader): GetUsersResponse;
}

export namespace GetUsersResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
  }
}

export class ScoreSheetTemplateSection extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getMaxValue(): number;
  setMaxValue(value: number): void;

  getMultiplier(): number;
  setMultiplier(value: number): void;

  getDisplayOrder(): number;
  setDisplayOrder(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScoreSheetTemplateSection.AsObject;
  static toObject(includeInstance: boolean, msg: ScoreSheetTemplateSection): ScoreSheetTemplateSection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScoreSheetTemplateSection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScoreSheetTemplateSection;
  static deserializeBinaryFromReader(message: ScoreSheetTemplateSection, reader: jspb.BinaryReader): ScoreSheetTemplateSection;
}

export namespace ScoreSheetTemplateSection {
  export type AsObject = {
    id: string,
    title: string,
    description: string,
    maxValue: number,
    multiplier: number,
    displayOrder: number,
  }
}

export class ScoreSheetTemplate extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getType(): ScoreSheetTemplate.Type;
  setType(value: ScoreSheetTemplate.Type): void;

  clearTimingsList(): void;
  getTimingsList(): Array<string>;
  setTimingsList(value: Array<string>): void;
  addTimings(value: string, index?: number): string;

  clearSectionsList(): void;
  getSectionsList(): Array<ScoreSheetTemplateSection>;
  setSectionsList(value: Array<ScoreSheetTemplateSection>): void;
  addSections(value?: ScoreSheetTemplateSection, index?: number): ScoreSheetTemplateSection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScoreSheetTemplate.AsObject;
  static toObject(includeInstance: boolean, msg: ScoreSheetTemplate): ScoreSheetTemplate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScoreSheetTemplate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScoreSheetTemplate;
  static deserializeBinaryFromReader(message: ScoreSheetTemplate, reader: jspb.BinaryReader): ScoreSheetTemplate;
}

export namespace ScoreSheetTemplate {
  export type AsObject = {
    id: string,
    name: string,
    type: ScoreSheetTemplate.Type,
    timingsList: Array<string>,
    sectionsList: Array<ScoreSheetTemplateSection.AsObject>,
  }

  export enum Type {
    INTERVIEW = 0,
    PERFORMANCE = 1,
  }
}

export class GetScoreSheetTemplatesRequest extends jspb.Message {
  hasFilter(): boolean;
  clearFilter(): void;
  getFilter(): GetScoreSheetTemplatesRequest.QueryParameters | undefined;
  setFilter(value?: GetScoreSheetTemplatesRequest.QueryParameters): void;

  getPopulateSections(): boolean;
  setPopulateSections(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScoreSheetTemplatesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetScoreSheetTemplatesRequest): GetScoreSheetTemplatesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetScoreSheetTemplatesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScoreSheetTemplatesRequest;
  static deserializeBinaryFromReader(message: GetScoreSheetTemplatesRequest, reader: jspb.BinaryReader): GetScoreSheetTemplatesRequest;
}

export namespace GetScoreSheetTemplatesRequest {
  export type AsObject = {
    filter?: GetScoreSheetTemplatesRequest.QueryParameters.AsObject,
    populateSections: boolean,
  }

  export class QueryParameters extends jspb.Message {
    clearIdList(): void;
    getIdList(): Array<string>;
    setIdList(value: Array<string>): void;
    addId(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QueryParameters.AsObject;
    static toObject(includeInstance: boolean, msg: QueryParameters): QueryParameters.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QueryParameters, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QueryParameters;
    static deserializeBinaryFromReader(message: QueryParameters, reader: jspb.BinaryReader): QueryParameters;
  }

  export namespace QueryParameters {
    export type AsObject = {
      idList: Array<string>,
    }
  }
}

export class GetScoreSheetTemplatesResponse extends jspb.Message {
  clearScoreSheetTemplatesList(): void;
  getScoreSheetTemplatesList(): Array<ScoreSheetTemplate>;
  setScoreSheetTemplatesList(value: Array<ScoreSheetTemplate>): void;
  addScoreSheetTemplates(value?: ScoreSheetTemplate, index?: number): ScoreSheetTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScoreSheetTemplatesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetScoreSheetTemplatesResponse): GetScoreSheetTemplatesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetScoreSheetTemplatesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScoreSheetTemplatesResponse;
  static deserializeBinaryFromReader(message: GetScoreSheetTemplatesResponse, reader: jspb.BinaryReader): GetScoreSheetTemplatesResponse;
}

export namespace GetScoreSheetTemplatesResponse {
  export type AsObject = {
    scoreSheetTemplatesList: Array<ScoreSheetTemplate.AsObject>,
  }
}

export class LoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class LoginResponse extends jspb.Message {
  hasAuthenticatedUser(): boolean;
  clearAuthenticatedUser(): void;
  getAuthenticatedUser(): User | undefined;
  setAuthenticatedUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    authenticatedUser?: User.AsObject,
  }
}

export class GetCurrentUserRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentUserRequest): GetCurrentUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCurrentUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentUserRequest;
  static deserializeBinaryFromReader(message: GetCurrentUserRequest, reader: jspb.BinaryReader): GetCurrentUserRequest;
}

export namespace GetCurrentUserRequest {
  export type AsObject = {
  }
}

export class GetCurrentUserResponse extends jspb.Message {
  hasAuthenticatedUser(): boolean;
  clearAuthenticatedUser(): void;
  getAuthenticatedUser(): User | undefined;
  setAuthenticatedUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCurrentUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCurrentUserResponse): GetCurrentUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCurrentUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCurrentUserResponse;
  static deserializeBinaryFromReader(message: GetCurrentUserResponse, reader: jspb.BinaryReader): GetCurrentUserResponse;
}

export namespace GetCurrentUserResponse {
  export type AsObject = {
    authenticatedUser?: User.AsObject,
  }
}

export class DivisionLadder extends jspb.Message {
  hasDivision(): boolean;
  clearDivision(): void;
  getDivision(): Division | undefined;
  setDivision(value?: Division): void;

  clearLadderList(): void;
  getLadderList(): Array<DivisionLadder.LadderEntry>;
  setLadderList(value: Array<DivisionLadder.LadderEntry>): void;
  addLadder(value?: DivisionLadder.LadderEntry, index?: number): DivisionLadder.LadderEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DivisionLadder.AsObject;
  static toObject(includeInstance: boolean, msg: DivisionLadder): DivisionLadder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DivisionLadder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DivisionLadder;
  static deserializeBinaryFromReader(message: DivisionLadder, reader: jspb.BinaryReader): DivisionLadder;
}

export namespace DivisionLadder {
  export type AsObject = {
    division?: Division.AsObject,
    ladderList: Array<DivisionLadder.LadderEntry.AsObject>,
  }

  export class LadderEntry extends jspb.Message {
    hasTeam(): boolean;
    clearTeam(): void;
    getTeam(): Team | undefined;
    setTeam(value?: Team): void;

    clearRoundsList(): void;
    getRoundsList(): Array<DivisionLadder.LadderEntry.RoundAverage>;
    setRoundsList(value: Array<DivisionLadder.LadderEntry.RoundAverage>): void;
    addRounds(value?: DivisionLadder.LadderEntry.RoundAverage, index?: number): DivisionLadder.LadderEntry.RoundAverage;

    getInterviewScore(): number;
    setInterviewScore(value: number): void;

    getBestRound(): number;
    setBestRound(value: number): void;

    getBestFinal(): number;
    setBestFinal(value: number): void;

    getRoundTotal(): number;
    setRoundTotal(value: number): void;

    getFinalTotal(): number;
    setFinalTotal(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LadderEntry.AsObject;
    static toObject(includeInstance: boolean, msg: LadderEntry): LadderEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LadderEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LadderEntry;
    static deserializeBinaryFromReader(message: LadderEntry, reader: jspb.BinaryReader): LadderEntry;
  }

  export namespace LadderEntry {
    export type AsObject = {
      team?: Team.AsObject,
      roundsList: Array<DivisionLadder.LadderEntry.RoundAverage.AsObject>,
      interviewScore: number,
      bestRound: number,
      bestFinal: number,
      roundTotal: number,
      finalTotal: number,
    }

    export class RoundAverage extends jspb.Message {
      getRound(): number;
      setRound(value: number): void;

      getAverage(): number;
      setAverage(value: number): void;

      getCount(): number;
      setCount(value: number): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): RoundAverage.AsObject;
      static toObject(includeInstance: boolean, msg: RoundAverage): RoundAverage.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: RoundAverage, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): RoundAverage;
      static deserializeBinaryFromReader(message: RoundAverage, reader: jspb.BinaryReader): RoundAverage;
    }

    export namespace RoundAverage {
      export type AsObject = {
        round: number,
        average: number,
        count: number,
      }
    }
  }
}

export class GetDanceLadderRequest extends jspb.Message {
  getShowAll(): boolean;
  setShowAll(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDanceLadderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDanceLadderRequest): GetDanceLadderRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDanceLadderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDanceLadderRequest;
  static deserializeBinaryFromReader(message: GetDanceLadderRequest, reader: jspb.BinaryReader): GetDanceLadderRequest;
}

export namespace GetDanceLadderRequest {
  export type AsObject = {
    showAll: boolean,
  }
}

export class GetDanceLadderResponse extends jspb.Message {
  clearDivisionsList(): void;
  getDivisionsList(): Array<DivisionLadder>;
  setDivisionsList(value: Array<DivisionLadder>): void;
  addDivisions(value?: DivisionLadder, index?: number): DivisionLadder;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDanceLadderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDanceLadderResponse): GetDanceLadderResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDanceLadderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDanceLadderResponse;
  static deserializeBinaryFromReader(message: GetDanceLadderResponse, reader: jspb.BinaryReader): GetDanceLadderResponse;
}

export namespace GetDanceLadderResponse {
  export type AsObject = {
    divisionsList: Array<DivisionLadder.AsObject>,
  }
}

export class GetDivisionRequest extends jspb.Message {
  getDivisionId(): string;
  setDivisionId(value: string): void;

  getIncludeTeams(): boolean;
  setIncludeTeams(value: boolean): void;

  getIncludeTemplates(): boolean;
  setIncludeTemplates(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDivisionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDivisionRequest): GetDivisionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDivisionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDivisionRequest;
  static deserializeBinaryFromReader(message: GetDivisionRequest, reader: jspb.BinaryReader): GetDivisionRequest;
}

export namespace GetDivisionRequest {
  export type AsObject = {
    divisionId: string,
    includeTeams: boolean,
    includeTemplates: boolean,
  }
}

export class GetDivisionResponse extends jspb.Message {
  hasDivision(): boolean;
  clearDivision(): void;
  getDivision(): Division | undefined;
  setDivision(value?: Division): void;

  clearTeamsList(): void;
  getTeamsList(): Array<Team>;
  setTeamsList(value: Array<Team>): void;
  addTeams(value?: Team, index?: number): Team;

  clearTemplatesList(): void;
  getTemplatesList(): Array<ScoreSheetTemplate>;
  setTemplatesList(value: Array<ScoreSheetTemplate>): void;
  addTemplates(value?: ScoreSheetTemplate, index?: number): ScoreSheetTemplate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDivisionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDivisionResponse): GetDivisionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetDivisionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDivisionResponse;
  static deserializeBinaryFromReader(message: GetDivisionResponse, reader: jspb.BinaryReader): GetDivisionResponse;
}

export namespace GetDivisionResponse {
  export type AsObject = {
    division?: Division.AsObject,
    teamsList: Array<Team.AsObject>,
    templatesList: Array<ScoreSheetTemplate.AsObject>,
  }
}

export class ScoreSheetSection extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getMaxValue(): number;
  setMaxValue(value: number): void;

  getMultiplier(): number;
  setMultiplier(value: number): void;

  getSectionId(): string;
  setSectionId(value: string): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScoreSheetSection.AsObject;
  static toObject(includeInstance: boolean, msg: ScoreSheetSection): ScoreSheetSection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScoreSheetSection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScoreSheetSection;
  static deserializeBinaryFromReader(message: ScoreSheetSection, reader: jspb.BinaryReader): ScoreSheetSection;
}

export namespace ScoreSheetSection {
  export type AsObject = {
    id: string,
    title: string,
    description: string,
    maxValue: number,
    multiplier: number,
    sectionId: string,
    value: number,
  }
}

export class ScoreSheet extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getComments(): string;
  setComments(value: string): void;

  getRound(): number;
  setRound(value: number): void;

  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  hasAuthor(): boolean;
  clearAuthor(): void;
  getAuthor(): User | undefined;
  setAuthor(value?: User): void;

  clearSectionsList(): void;
  getSectionsList(): Array<ScoreSheetSection>;
  setSectionsList(value: Array<ScoreSheetSection>): void;
  addSections(value?: ScoreSheetSection, index?: number): ScoreSheetSection;

  clearTimingsList(): void;
  getTimingsList(): Array<ScoreSheet.Timing>;
  setTimingsList(value: Array<ScoreSheet.Timing>): void;
  addTimings(value?: ScoreSheet.Timing, index?: number): ScoreSheet.Timing;

  getType(): ScoreSheetTemplate.Type;
  setType(value: ScoreSheetTemplate.Type): void;

  getScoreSheetTemplateId(): string;
  setScoreSheetTemplateId(value: string): void;

  getDivisionId(): string;
  setDivisionId(value: string): void;

  getTotal(): number;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScoreSheet.AsObject;
  static toObject(includeInstance: boolean, msg: ScoreSheet): ScoreSheet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScoreSheet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScoreSheet;
  static deserializeBinaryFromReader(message: ScoreSheet, reader: jspb.BinaryReader): ScoreSheet;
}

export namespace ScoreSheet {
  export type AsObject = {
    id: string,
    comments: string,
    round: number,
    team?: Team.AsObject,
    author?: User.AsObject,
    sectionsList: Array<ScoreSheetSection.AsObject>,
    timingsList: Array<ScoreSheet.Timing.AsObject>,
    type: ScoreSheetTemplate.Type,
    scoreSheetTemplateId: string,
    divisionId: string,
    total: number,
  }

  export class Timing extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    getValue(): string;
    setValue(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Timing.AsObject;
    static toObject(includeInstance: boolean, msg: Timing): Timing.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Timing, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Timing;
    static deserializeBinaryFromReader(message: Timing, reader: jspb.BinaryReader): Timing;
  }

  export namespace Timing {
    export type AsObject = {
      name: string,
      value: string,
    }
  }
}

export class Checkin extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  hasAgent(): boolean;
  clearAgent(): void;
  getAgent(): User | undefined;
  setAgent(value?: User): void;

  getComments(): string;
  setComments(value: string): void;

  hasInTime(): boolean;
  clearInTime(): void;
  getInTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setInTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Checkin.AsObject;
  static toObject(includeInstance: boolean, msg: Checkin): Checkin.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Checkin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Checkin;
  static deserializeBinaryFromReader(message: Checkin, reader: jspb.BinaryReader): Checkin;
}

export namespace Checkin {
  export type AsObject = {
    id: string,
    team?: Team.AsObject,
    agent?: User.AsObject,
    comments: string,
    inTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetScoreSheetRequest extends jspb.Message {
  getScoreSheetId(): string;
  setScoreSheetId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScoreSheetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetScoreSheetRequest): GetScoreSheetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetScoreSheetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScoreSheetRequest;
  static deserializeBinaryFromReader(message: GetScoreSheetRequest, reader: jspb.BinaryReader): GetScoreSheetRequest;
}

export namespace GetScoreSheetRequest {
  export type AsObject = {
    scoreSheetId: string,
  }
}

export class GetScoreSheetResponse extends jspb.Message {
  hasScoreSheet(): boolean;
  clearScoreSheet(): void;
  getScoreSheet(): ScoreSheet | undefined;
  setScoreSheet(value?: ScoreSheet): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScoreSheetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetScoreSheetResponse): GetScoreSheetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetScoreSheetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScoreSheetResponse;
  static deserializeBinaryFromReader(message: GetScoreSheetResponse, reader: jspb.BinaryReader): GetScoreSheetResponse;
}

export namespace GetScoreSheetResponse {
  export type AsObject = {
    scoreSheet?: ScoreSheet.AsObject,
  }
}

export class CreateScoreSheetRequest extends jspb.Message {
  hasScoreSheet(): boolean;
  clearScoreSheet(): void;
  getScoreSheet(): ScoreSheet | undefined;
  setScoreSheet(value?: ScoreSheet): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateScoreSheetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateScoreSheetRequest): CreateScoreSheetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateScoreSheetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateScoreSheetRequest;
  static deserializeBinaryFromReader(message: CreateScoreSheetRequest, reader: jspb.BinaryReader): CreateScoreSheetRequest;
}

export namespace CreateScoreSheetRequest {
  export type AsObject = {
    scoreSheet?: ScoreSheet.AsObject,
  }
}

export class CreateScoreSheetResponse extends jspb.Message {
  hasScoreSheet(): boolean;
  clearScoreSheet(): void;
  getScoreSheet(): ScoreSheet | undefined;
  setScoreSheet(value?: ScoreSheet): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateScoreSheetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateScoreSheetResponse): CreateScoreSheetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateScoreSheetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateScoreSheetResponse;
  static deserializeBinaryFromReader(message: CreateScoreSheetResponse, reader: jspb.BinaryReader): CreateScoreSheetResponse;
}

export namespace CreateScoreSheetResponse {
  export type AsObject = {
    scoreSheet?: ScoreSheet.AsObject,
  }
}

export class UpdateScoreSheetRequest extends jspb.Message {
  hasScoreSheet(): boolean;
  clearScoreSheet(): void;
  getScoreSheet(): ScoreSheet | undefined;
  setScoreSheet(value?: ScoreSheet): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateScoreSheetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateScoreSheetRequest): UpdateScoreSheetRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateScoreSheetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateScoreSheetRequest;
  static deserializeBinaryFromReader(message: UpdateScoreSheetRequest, reader: jspb.BinaryReader): UpdateScoreSheetRequest;
}

export namespace UpdateScoreSheetRequest {
  export type AsObject = {
    scoreSheet?: ScoreSheet.AsObject,
  }
}

export class UpdateScoreSheetResponse extends jspb.Message {
  hasScoreSheet(): boolean;
  clearScoreSheet(): void;
  getScoreSheet(): ScoreSheet | undefined;
  setScoreSheet(value?: ScoreSheet): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateScoreSheetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateScoreSheetResponse): UpdateScoreSheetResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateScoreSheetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateScoreSheetResponse;
  static deserializeBinaryFromReader(message: UpdateScoreSheetResponse, reader: jspb.BinaryReader): UpdateScoreSheetResponse;
}

export namespace UpdateScoreSheetResponse {
  export type AsObject = {
    scoreSheet?: ScoreSheet.AsObject,
  }
}

export class GetTeamRequest extends jspb.Message {
  getTeamId(): string;
  setTeamId(value: string): void;

  getIncludeScoreSheets(): boolean;
  setIncludeScoreSheets(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTeamRequest): GetTeamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTeamRequest;
  static deserializeBinaryFromReader(message: GetTeamRequest, reader: jspb.BinaryReader): GetTeamRequest;
}

export namespace GetTeamRequest {
  export type AsObject = {
    teamId: string,
    includeScoreSheets: boolean,
  }
}

export class GetTeamResponse extends jspb.Message {
  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  hasDivision(): boolean;
  clearDivision(): void;
  getDivision(): Division | undefined;
  setDivision(value?: Division): void;

  clearScoreSheetsList(): void;
  getScoreSheetsList(): Array<ScoreSheet>;
  setScoreSheetsList(value: Array<ScoreSheet>): void;
  addScoreSheets(value?: ScoreSheet, index?: number): ScoreSheet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTeamResponse): GetTeamResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTeamResponse;
  static deserializeBinaryFromReader(message: GetTeamResponse, reader: jspb.BinaryReader): GetTeamResponse;
}

export namespace GetTeamResponse {
  export type AsObject = {
    team?: Team.AsObject,
    division?: Division.AsObject,
    scoreSheetsList: Array<ScoreSheet.AsObject>,
  }
}

export class CreateTeamRequest extends jspb.Message {
  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTeamRequest): CreateTeamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTeamRequest;
  static deserializeBinaryFromReader(message: CreateTeamRequest, reader: jspb.BinaryReader): CreateTeamRequest;
}

export namespace CreateTeamRequest {
  export type AsObject = {
    team?: Team.AsObject,
  }
}

export class CreateTeamResponse extends jspb.Message {
  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTeamResponse): CreateTeamResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTeamResponse;
  static deserializeBinaryFromReader(message: CreateTeamResponse, reader: jspb.BinaryReader): CreateTeamResponse;
}

export namespace CreateTeamResponse {
  export type AsObject = {
    team?: Team.AsObject,
  }
}

export class GetInstitutionsRequest extends jspb.Message {
  getSearchString(): string;
  setSearchString(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetInstitutionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetInstitutionsRequest): GetInstitutionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetInstitutionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetInstitutionsRequest;
  static deserializeBinaryFromReader(message: GetInstitutionsRequest, reader: jspb.BinaryReader): GetInstitutionsRequest;
}

export namespace GetInstitutionsRequest {
  export type AsObject = {
    searchString: string,
  }
}

export class GetInstitutionsResponse extends jspb.Message {
  clearInstitutionsList(): void;
  getInstitutionsList(): Array<Institution>;
  setInstitutionsList(value: Array<Institution>): void;
  addInstitutions(value?: Institution, index?: number): Institution;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetInstitutionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetInstitutionsResponse): GetInstitutionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetInstitutionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetInstitutionsResponse;
  static deserializeBinaryFromReader(message: GetInstitutionsResponse, reader: jspb.BinaryReader): GetInstitutionsResponse;
}

export namespace GetInstitutionsResponse {
  export type AsObject = {
    institutionsList: Array<Institution.AsObject>,
  }
}

export class UpdateTeamRequest extends jspb.Message {
  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTeamRequest): UpdateTeamRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTeamRequest;
  static deserializeBinaryFromReader(message: UpdateTeamRequest, reader: jspb.BinaryReader): UpdateTeamRequest;
}

export namespace UpdateTeamRequest {
  export type AsObject = {
    team?: Team.AsObject,
  }
}

export class UpdateTeamResponse extends jspb.Message {
  hasTeam(): boolean;
  clearTeam(): void;
  getTeam(): Team | undefined;
  setTeam(value?: Team): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTeamResponse): UpdateTeamResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTeamResponse;
  static deserializeBinaryFromReader(message: UpdateTeamResponse, reader: jspb.BinaryReader): UpdateTeamResponse;
}

export namespace UpdateTeamResponse {
  export type AsObject = {
    team?: Team.AsObject,
  }
}

export class GetTeamsRequest extends jspb.Message {
  getPopulateMembers(): boolean;
  setPopulateMembers(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTeamsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTeamsRequest): GetTeamsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTeamsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTeamsRequest;
  static deserializeBinaryFromReader(message: GetTeamsRequest, reader: jspb.BinaryReader): GetTeamsRequest;
}

export namespace GetTeamsRequest {
  export type AsObject = {
    populateMembers: boolean,
  }
}

export class GetTeamsResponse extends jspb.Message {
  clearTeamsList(): void;
  getTeamsList(): Array<Team>;
  setTeamsList(value: Array<Team>): void;
  addTeams(value?: Team, index?: number): Team;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTeamsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTeamsResponse): GetTeamsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTeamsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTeamsResponse;
  static deserializeBinaryFromReader(message: GetTeamsResponse, reader: jspb.BinaryReader): GetTeamsResponse;
}

export namespace GetTeamsResponse {
  export type AsObject = {
    teamsList: Array<Team.AsObject>,
  }
}

export class CreateDivisionRequest extends jspb.Message {
  hasDivision(): boolean;
  clearDivision(): void;
  getDivision(): Division | undefined;
  setDivision(value?: Division): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateDivisionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateDivisionRequest): CreateDivisionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateDivisionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateDivisionRequest;
  static deserializeBinaryFromReader(message: CreateDivisionRequest, reader: jspb.BinaryReader): CreateDivisionRequest;
}

export namespace CreateDivisionRequest {
  export type AsObject = {
    division?: Division.AsObject,
  }
}

export class CreateDivisionResponse extends jspb.Message {
  hasDivision(): boolean;
  clearDivision(): void;
  getDivision(): Division | undefined;
  setDivision(value?: Division): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateDivisionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateDivisionResponse): CreateDivisionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateDivisionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateDivisionResponse;
  static deserializeBinaryFromReader(message: CreateDivisionResponse, reader: jspb.BinaryReader): CreateDivisionResponse;
}

export namespace CreateDivisionResponse {
  export type AsObject = {
    division?: Division.AsObject,
  }
}

export class CreateScoreSheetTemplateRequest extends jspb.Message {
  hasScoreSheetTemplate(): boolean;
  clearScoreSheetTemplate(): void;
  getScoreSheetTemplate(): ScoreSheetTemplate | undefined;
  setScoreSheetTemplate(value?: ScoreSheetTemplate): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateScoreSheetTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateScoreSheetTemplateRequest): CreateScoreSheetTemplateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateScoreSheetTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateScoreSheetTemplateRequest;
  static deserializeBinaryFromReader(message: CreateScoreSheetTemplateRequest, reader: jspb.BinaryReader): CreateScoreSheetTemplateRequest;
}

export namespace CreateScoreSheetTemplateRequest {
  export type AsObject = {
    scoreSheetTemplate?: ScoreSheetTemplate.AsObject,
  }
}

export class CreateScoreSheetTemplateResponse extends jspb.Message {
  hasScoreSheetTemplate(): boolean;
  clearScoreSheetTemplate(): void;
  getScoreSheetTemplate(): ScoreSheetTemplate | undefined;
  setScoreSheetTemplate(value?: ScoreSheetTemplate): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateScoreSheetTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateScoreSheetTemplateResponse): CreateScoreSheetTemplateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateScoreSheetTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateScoreSheetTemplateResponse;
  static deserializeBinaryFromReader(message: CreateScoreSheetTemplateResponse, reader: jspb.BinaryReader): CreateScoreSheetTemplateResponse;
}

export namespace CreateScoreSheetTemplateResponse {
  export type AsObject = {
    scoreSheetTemplate?: ScoreSheetTemplate.AsObject,
  }
}

export class CreateUserRequest extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
  static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class CreateUserResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
  static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class UpdateUserRequest extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
  static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class UpdateUserResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserResponse): UpdateUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserResponse;
  static deserializeBinaryFromReader(message: UpdateUserResponse, reader: jspb.BinaryReader): UpdateUserResponse;
}

export namespace UpdateUserResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class GetCheckinsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCheckinsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCheckinsRequest): GetCheckinsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCheckinsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCheckinsRequest;
  static deserializeBinaryFromReader(message: GetCheckinsRequest, reader: jspb.BinaryReader): GetCheckinsRequest;
}

export namespace GetCheckinsRequest {
  export type AsObject = {
  }
}

export class GetCheckinsResponse extends jspb.Message {
  clearCheckInsList(): void;
  getCheckInsList(): Array<Checkin>;
  setCheckInsList(value: Array<Checkin>): void;
  addCheckIns(value?: Checkin, index?: number): Checkin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCheckinsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCheckinsResponse): GetCheckinsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCheckinsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCheckinsResponse;
  static deserializeBinaryFromReader(message: GetCheckinsResponse, reader: jspb.BinaryReader): GetCheckinsResponse;
}

export namespace GetCheckinsResponse {
  export type AsObject = {
    checkInsList: Array<Checkin.AsObject>,
  }
}

export class CreateCheckinRequest extends jspb.Message {
  hasCheckIn(): boolean;
  clearCheckIn(): void;
  getCheckIn(): Checkin | undefined;
  setCheckIn(value?: Checkin): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCheckinRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCheckinRequest): CreateCheckinRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCheckinRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCheckinRequest;
  static deserializeBinaryFromReader(message: CreateCheckinRequest, reader: jspb.BinaryReader): CreateCheckinRequest;
}

export namespace CreateCheckinRequest {
  export type AsObject = {
    checkIn?: Checkin.AsObject,
  }
}

export class CreateCheckinResponse extends jspb.Message {
  hasCheckIn(): boolean;
  clearCheckIn(): void;
  getCheckIn(): Checkin | undefined;
  setCheckIn(value?: Checkin): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCheckinResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCheckinResponse): CreateCheckinResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCheckinResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCheckinResponse;
  static deserializeBinaryFromReader(message: CreateCheckinResponse, reader: jspb.BinaryReader): CreateCheckinResponse;
}

export namespace CreateCheckinResponse {
  export type AsObject = {
    checkIn?: Checkin.AsObject,
  }
}

export class GetScoreSheetsRequest extends jspb.Message {
  getCurrentUser(): boolean;
  setCurrentUser(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScoreSheetsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetScoreSheetsRequest): GetScoreSheetsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetScoreSheetsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScoreSheetsRequest;
  static deserializeBinaryFromReader(message: GetScoreSheetsRequest, reader: jspb.BinaryReader): GetScoreSheetsRequest;
}

export namespace GetScoreSheetsRequest {
  export type AsObject = {
    currentUser: boolean,
  }
}

export class GetScoreSheetsResponse extends jspb.Message {
  clearScoreSheetsList(): void;
  getScoreSheetsList(): Array<ScoreSheet>;
  setScoreSheetsList(value: Array<ScoreSheet>): void;
  addScoreSheets(value?: ScoreSheet, index?: number): ScoreSheet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScoreSheetsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetScoreSheetsResponse): GetScoreSheetsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetScoreSheetsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScoreSheetsResponse;
  static deserializeBinaryFromReader(message: GetScoreSheetsResponse, reader: jspb.BinaryReader): GetScoreSheetsResponse;
}

export namespace GetScoreSheetsResponse {
  export type AsObject = {
    scoreSheetsList: Array<ScoreSheet.AsObject>,
  }
}

export class GetSheetTeamsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSheetTeamsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSheetTeamsRequest): GetSheetTeamsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSheetTeamsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSheetTeamsRequest;
  static deserializeBinaryFromReader(message: GetSheetTeamsRequest, reader: jspb.BinaryReader): GetSheetTeamsRequest;
}

export namespace GetSheetTeamsRequest {
  export type AsObject = {
  }
}

export class GetSheetTeamsResponse extends jspb.Message {
  clearTeamsList(): void;
  getTeamsList(): Array<Team>;
  setTeamsList(value: Array<Team>): void;
  addTeams(value?: Team, index?: number): Team;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSheetTeamsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSheetTeamsResponse): GetSheetTeamsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSheetTeamsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSheetTeamsResponse;
  static deserializeBinaryFromReader(message: GetSheetTeamsResponse, reader: jspb.BinaryReader): GetSheetTeamsResponse;
}

export namespace GetSheetTeamsResponse {
  export type AsObject = {
    teamsList: Array<Team.AsObject>,
  }
}

export class SyncCheckinsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SyncCheckinsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SyncCheckinsRequest): SyncCheckinsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SyncCheckinsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SyncCheckinsRequest;
  static deserializeBinaryFromReader(message: SyncCheckinsRequest, reader: jspb.BinaryReader): SyncCheckinsRequest;
}

export namespace SyncCheckinsRequest {
  export type AsObject = {
  }
}

export class SyncCheckinsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SyncCheckinsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SyncCheckinsResponse): SyncCheckinsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SyncCheckinsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SyncCheckinsResponse;
  static deserializeBinaryFromReader(message: SyncCheckinsResponse, reader: jspb.BinaryReader): SyncCheckinsResponse;
}

export namespace SyncCheckinsResponse {
  export type AsObject = {
  }
}

export class GetSheetAuthUrlRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSheetAuthUrlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSheetAuthUrlRequest): GetSheetAuthUrlRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSheetAuthUrlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSheetAuthUrlRequest;
  static deserializeBinaryFromReader(message: GetSheetAuthUrlRequest, reader: jspb.BinaryReader): GetSheetAuthUrlRequest;
}

export namespace GetSheetAuthUrlRequest {
  export type AsObject = {
  }
}

export class GetSheetAuthUrlResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSheetAuthUrlResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSheetAuthUrlResponse): GetSheetAuthUrlResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSheetAuthUrlResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSheetAuthUrlResponse;
  static deserializeBinaryFromReader(message: GetSheetAuthUrlResponse, reader: jspb.BinaryReader): GetSheetAuthUrlResponse;
}

export namespace GetSheetAuthUrlResponse {
  export type AsObject = {
    url: string,
  }
}

export class GetSheetConfigRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSheetConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSheetConfigRequest): GetSheetConfigRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSheetConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSheetConfigRequest;
  static deserializeBinaryFromReader(message: GetSheetConfigRequest, reader: jspb.BinaryReader): GetSheetConfigRequest;
}

export namespace GetSheetConfigRequest {
  export type AsObject = {
  }
}

export class GetSheetConfigResponse extends jspb.Message {
  getIngestionSpreadsheetId(): string;
  setIngestionSpreadsheetId(value: string): void;

  getPushSpreadsheetId(): string;
  setPushSpreadsheetId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSheetConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSheetConfigResponse): GetSheetConfigResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSheetConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSheetConfigResponse;
  static deserializeBinaryFromReader(message: GetSheetConfigResponse, reader: jspb.BinaryReader): GetSheetConfigResponse;
}

export namespace GetSheetConfigResponse {
  export type AsObject = {
    ingestionSpreadsheetId: string,
    pushSpreadsheetId: string,
  }
}

export class SubmitSheetConfigRequest extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getIngestionSpreadsheetId(): string;
  setIngestionSpreadsheetId(value: string): void;

  getPushSpreadsheetId(): string;
  setPushSpreadsheetId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitSheetConfigRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitSheetConfigRequest): SubmitSheetConfigRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmitSheetConfigRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitSheetConfigRequest;
  static deserializeBinaryFromReader(message: SubmitSheetConfigRequest, reader: jspb.BinaryReader): SubmitSheetConfigRequest;
}

export namespace SubmitSheetConfigRequest {
  export type AsObject = {
    code: string,
    ingestionSpreadsheetId: string,
    pushSpreadsheetId: string,
  }
}

export class SubmitSheetConfigResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmitSheetConfigResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubmitSheetConfigResponse): SubmitSheetConfigResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmitSheetConfigResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmitSheetConfigResponse;
  static deserializeBinaryFromReader(message: SubmitSheetConfigResponse, reader: jspb.BinaryReader): SubmitSheetConfigResponse;
}

export namespace SubmitSheetConfigResponse {
  export type AsObject = {
  }
}

