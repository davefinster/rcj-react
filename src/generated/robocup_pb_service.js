// package: 
// file: robocup.proto

var robocup_pb = require("./robocup_pb");
var grpc = require("grpc-web-client").grpc;

var Robocup = (function () {
  function Robocup() {}
  Robocup.serviceName = "Robocup";
  return Robocup;
}());

Robocup.Login = {
  methodName: "Login",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.LoginRequest,
  responseType: robocup_pb.LoginResponse
};

Robocup.GetCurrentUser = {
  methodName: "GetCurrentUser",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetCurrentUserRequest,
  responseType: robocup_pb.GetCurrentUserResponse
};

Robocup.GetDanceLadder = {
  methodName: "GetDanceLadder",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetDanceLadderRequest,
  responseType: robocup_pb.GetDanceLadderResponse
};

Robocup.GetDivision = {
  methodName: "GetDivision",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetDivisionRequest,
  responseType: robocup_pb.GetDivisionResponse
};

Robocup.GetScoreSheet = {
  methodName: "GetScoreSheet",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetScoreSheetRequest,
  responseType: robocup_pb.GetScoreSheetResponse
};

Robocup.CreateScoreSheet = {
  methodName: "CreateScoreSheet",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.CreateScoreSheetRequest,
  responseType: robocup_pb.CreateScoreSheetResponse
};

Robocup.UpdateScoreSheet = {
  methodName: "UpdateScoreSheet",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.UpdateScoreSheetRequest,
  responseType: robocup_pb.UpdateScoreSheetResponse
};

Robocup.GetDivisions = {
  methodName: "GetDivisions",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetDivisionsRequest,
  responseType: robocup_pb.GetDivisionsResponse
};

Robocup.GetUsers = {
  methodName: "GetUsers",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetUsersRequest,
  responseType: robocup_pb.GetUsersResponse
};

Robocup.GetScoreSheetTemplates = {
  methodName: "GetScoreSheetTemplates",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetScoreSheetTemplatesRequest,
  responseType: robocup_pb.GetScoreSheetTemplatesResponse
};

Robocup.GetTeam = {
  methodName: "GetTeam",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetTeamRequest,
  responseType: robocup_pb.GetTeamResponse
};

Robocup.CreateTeam = {
  methodName: "CreateTeam",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.CreateTeamRequest,
  responseType: robocup_pb.CreateTeamResponse
};

Robocup.GetInstitutions = {
  methodName: "GetInstitutions",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetInstitutionsRequest,
  responseType: robocup_pb.GetInstitutionsResponse
};

Robocup.UpdateTeam = {
  methodName: "UpdateTeam",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.UpdateTeamRequest,
  responseType: robocup_pb.UpdateTeamResponse
};

Robocup.GetTeams = {
  methodName: "GetTeams",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetTeamsRequest,
  responseType: robocup_pb.GetTeamsResponse
};

Robocup.CreateDivision = {
  methodName: "CreateDivision",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.CreateDivisionRequest,
  responseType: robocup_pb.CreateDivisionResponse
};

Robocup.CreateScoreSheetTemplate = {
  methodName: "CreateScoreSheetTemplate",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.CreateScoreSheetTemplateRequest,
  responseType: robocup_pb.CreateScoreSheetTemplateResponse
};

Robocup.CreateUser = {
  methodName: "CreateUser",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.CreateUserRequest,
  responseType: robocup_pb.CreateUserResponse
};

Robocup.UpdateUser = {
  methodName: "UpdateUser",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.UpdateUserRequest,
  responseType: robocup_pb.UpdateUserResponse
};

Robocup.GetCheckins = {
  methodName: "GetCheckins",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetCheckinsRequest,
  responseType: robocup_pb.GetCheckinsResponse
};

Robocup.CreateCheckin = {
  methodName: "CreateCheckin",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.CreateCheckinRequest,
  responseType: robocup_pb.CreateCheckinResponse
};

Robocup.GetScoreSheets = {
  methodName: "GetScoreSheets",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetScoreSheetsRequest,
  responseType: robocup_pb.GetScoreSheetsResponse
};

Robocup.GetSheetTeams = {
  methodName: "GetSheetTeams",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetSheetTeamsRequest,
  responseType: robocup_pb.GetSheetTeamsResponse
};

Robocup.SyncCheckins = {
  methodName: "SyncCheckins",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.SyncCheckinsRequest,
  responseType: robocup_pb.SyncCheckinsResponse
};

Robocup.GetSheetAuthUrl = {
  methodName: "GetSheetAuthUrl",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetSheetAuthUrlRequest,
  responseType: robocup_pb.GetSheetAuthUrlResponse
};

Robocup.GetSheetConfig = {
  methodName: "GetSheetConfig",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.GetSheetConfigRequest,
  responseType: robocup_pb.GetSheetConfigResponse
};

Robocup.SubmitSheetConfig = {
  methodName: "SubmitSheetConfig",
  service: Robocup,
  requestStream: false,
  responseStream: false,
  requestType: robocup_pb.SubmitSheetConfigRequest,
  responseType: robocup_pb.SubmitSheetConfigResponse
};

exports.Robocup = Robocup;

function RobocupClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RobocupClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getCurrentUser = function getCurrentUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetCurrentUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getDanceLadder = function getDanceLadder(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetDanceLadder, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getDivision = function getDivision(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetDivision, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getScoreSheet = function getScoreSheet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetScoreSheet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.createScoreSheet = function createScoreSheet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.CreateScoreSheet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.updateScoreSheet = function updateScoreSheet(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.UpdateScoreSheet, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getDivisions = function getDivisions(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetDivisions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getUsers = function getUsers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetUsers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getScoreSheetTemplates = function getScoreSheetTemplates(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetScoreSheetTemplates, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getTeam = function getTeam(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetTeam, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.createTeam = function createTeam(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.CreateTeam, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getInstitutions = function getInstitutions(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetInstitutions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.updateTeam = function updateTeam(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.UpdateTeam, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getTeams = function getTeams(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetTeams, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.createDivision = function createDivision(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.CreateDivision, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.createScoreSheetTemplate = function createScoreSheetTemplate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.CreateScoreSheetTemplate, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.createUser = function createUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.CreateUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.updateUser = function updateUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.UpdateUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getCheckins = function getCheckins(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetCheckins, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.createCheckin = function createCheckin(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.CreateCheckin, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getScoreSheets = function getScoreSheets(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetScoreSheets, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getSheetTeams = function getSheetTeams(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetSheetTeams, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.syncCheckins = function syncCheckins(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.SyncCheckins, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getSheetAuthUrl = function getSheetAuthUrl(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetSheetAuthUrl, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.getSheetConfig = function getSheetConfig(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.GetSheetConfig, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

RobocupClient.prototype.submitSheetConfig = function submitSheetConfig(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Robocup.SubmitSheetConfig, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

exports.RobocupClient = RobocupClient;

