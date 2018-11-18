// package: 
// file: robocup.proto

import * as robocup_pb from "./robocup_pb";
import {grpc} from "grpc-web-client";

type RobocupLogin = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.LoginRequest;
  readonly responseType: typeof robocup_pb.LoginResponse;
};

type RobocupGetCurrentUser = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetCurrentUserRequest;
  readonly responseType: typeof robocup_pb.GetCurrentUserResponse;
};

type RobocupGetDanceLadder = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetDanceLadderRequest;
  readonly responseType: typeof robocup_pb.GetDanceLadderResponse;
};

type RobocupGetDivision = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetDivisionRequest;
  readonly responseType: typeof robocup_pb.GetDivisionResponse;
};

type RobocupGetScoreSheet = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetScoreSheetRequest;
  readonly responseType: typeof robocup_pb.GetScoreSheetResponse;
};

type RobocupCreateScoreSheet = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.CreateScoreSheetRequest;
  readonly responseType: typeof robocup_pb.CreateScoreSheetResponse;
};

type RobocupUpdateScoreSheet = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.UpdateScoreSheetRequest;
  readonly responseType: typeof robocup_pb.UpdateScoreSheetResponse;
};

type RobocupGetDivisions = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetDivisionsRequest;
  readonly responseType: typeof robocup_pb.GetDivisionsResponse;
};

type RobocupGetUsers = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetUsersRequest;
  readonly responseType: typeof robocup_pb.GetUsersResponse;
};

type RobocupGetScoreSheetTemplates = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetScoreSheetTemplatesRequest;
  readonly responseType: typeof robocup_pb.GetScoreSheetTemplatesResponse;
};

type RobocupGetTeam = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetTeamRequest;
  readonly responseType: typeof robocup_pb.GetTeamResponse;
};

type RobocupCreateTeam = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.CreateTeamRequest;
  readonly responseType: typeof robocup_pb.CreateTeamResponse;
};

type RobocupGetInstitutions = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetInstitutionsRequest;
  readonly responseType: typeof robocup_pb.GetInstitutionsResponse;
};

type RobocupUpdateTeam = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.UpdateTeamRequest;
  readonly responseType: typeof robocup_pb.UpdateTeamResponse;
};

type RobocupGetTeams = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetTeamsRequest;
  readonly responseType: typeof robocup_pb.GetTeamsResponse;
};

type RobocupCreateDivision = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.CreateDivisionRequest;
  readonly responseType: typeof robocup_pb.CreateDivisionResponse;
};

type RobocupCreateScoreSheetTemplate = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.CreateScoreSheetTemplateRequest;
  readonly responseType: typeof robocup_pb.CreateScoreSheetTemplateResponse;
};

type RobocupCreateUser = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.CreateUserRequest;
  readonly responseType: typeof robocup_pb.CreateUserResponse;
};

type RobocupUpdateUser = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.UpdateUserRequest;
  readonly responseType: typeof robocup_pb.UpdateUserResponse;
};

type RobocupGetCheckins = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetCheckinsRequest;
  readonly responseType: typeof robocup_pb.GetCheckinsResponse;
};

type RobocupCreateCheckin = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.CreateCheckinRequest;
  readonly responseType: typeof robocup_pb.CreateCheckinResponse;
};

type RobocupGetScoreSheets = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetScoreSheetsRequest;
  readonly responseType: typeof robocup_pb.GetScoreSheetsResponse;
};

type RobocupGetSheetTeams = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetSheetTeamsRequest;
  readonly responseType: typeof robocup_pb.GetSheetTeamsResponse;
};

type RobocupSyncCheckins = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.SyncCheckinsRequest;
  readonly responseType: typeof robocup_pb.SyncCheckinsResponse;
};

type RobocupGetSheetAuthUrl = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetSheetAuthUrlRequest;
  readonly responseType: typeof robocup_pb.GetSheetAuthUrlResponse;
};

type RobocupGetSheetConfig = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.GetSheetConfigRequest;
  readonly responseType: typeof robocup_pb.GetSheetConfigResponse;
};

type RobocupSubmitSheetConfig = {
  readonly methodName: string;
  readonly service: typeof Robocup;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof robocup_pb.SubmitSheetConfigRequest;
  readonly responseType: typeof robocup_pb.SubmitSheetConfigResponse;
};

export class Robocup {
  static readonly serviceName: string;
  static readonly Login: RobocupLogin;
  static readonly GetCurrentUser: RobocupGetCurrentUser;
  static readonly GetDanceLadder: RobocupGetDanceLadder;
  static readonly GetDivision: RobocupGetDivision;
  static readonly GetScoreSheet: RobocupGetScoreSheet;
  static readonly CreateScoreSheet: RobocupCreateScoreSheet;
  static readonly UpdateScoreSheet: RobocupUpdateScoreSheet;
  static readonly GetDivisions: RobocupGetDivisions;
  static readonly GetUsers: RobocupGetUsers;
  static readonly GetScoreSheetTemplates: RobocupGetScoreSheetTemplates;
  static readonly GetTeam: RobocupGetTeam;
  static readonly CreateTeam: RobocupCreateTeam;
  static readonly GetInstitutions: RobocupGetInstitutions;
  static readonly UpdateTeam: RobocupUpdateTeam;
  static readonly GetTeams: RobocupGetTeams;
  static readonly CreateDivision: RobocupCreateDivision;
  static readonly CreateScoreSheetTemplate: RobocupCreateScoreSheetTemplate;
  static readonly CreateUser: RobocupCreateUser;
  static readonly UpdateUser: RobocupUpdateUser;
  static readonly GetCheckins: RobocupGetCheckins;
  static readonly CreateCheckin: RobocupCreateCheckin;
  static readonly GetScoreSheets: RobocupGetScoreSheets;
  static readonly GetSheetTeams: RobocupGetSheetTeams;
  static readonly SyncCheckins: RobocupSyncCheckins;
  static readonly GetSheetAuthUrl: RobocupGetSheetAuthUrl;
  static readonly GetSheetConfig: RobocupGetSheetConfig;
  static readonly SubmitSheetConfig: RobocupSubmitSheetConfig;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class RobocupClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  login(
    requestMessage: robocup_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.LoginResponse|null) => void
  ): void;
  login(
    requestMessage: robocup_pb.LoginRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.LoginResponse|null) => void
  ): void;
  getCurrentUser(
    requestMessage: robocup_pb.GetCurrentUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetCurrentUserResponse|null) => void
  ): void;
  getCurrentUser(
    requestMessage: robocup_pb.GetCurrentUserRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetCurrentUserResponse|null) => void
  ): void;
  getDanceLadder(
    requestMessage: robocup_pb.GetDanceLadderRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetDanceLadderResponse|null) => void
  ): void;
  getDanceLadder(
    requestMessage: robocup_pb.GetDanceLadderRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetDanceLadderResponse|null) => void
  ): void;
  getDivision(
    requestMessage: robocup_pb.GetDivisionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetDivisionResponse|null) => void
  ): void;
  getDivision(
    requestMessage: robocup_pb.GetDivisionRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetDivisionResponse|null) => void
  ): void;
  getScoreSheet(
    requestMessage: robocup_pb.GetScoreSheetRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetScoreSheetResponse|null) => void
  ): void;
  getScoreSheet(
    requestMessage: robocup_pb.GetScoreSheetRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetScoreSheetResponse|null) => void
  ): void;
  createScoreSheet(
    requestMessage: robocup_pb.CreateScoreSheetRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateScoreSheetResponse|null) => void
  ): void;
  createScoreSheet(
    requestMessage: robocup_pb.CreateScoreSheetRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateScoreSheetResponse|null) => void
  ): void;
  updateScoreSheet(
    requestMessage: robocup_pb.UpdateScoreSheetRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.UpdateScoreSheetResponse|null) => void
  ): void;
  updateScoreSheet(
    requestMessage: robocup_pb.UpdateScoreSheetRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.UpdateScoreSheetResponse|null) => void
  ): void;
  getDivisions(
    requestMessage: robocup_pb.GetDivisionsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetDivisionsResponse|null) => void
  ): void;
  getDivisions(
    requestMessage: robocup_pb.GetDivisionsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetDivisionsResponse|null) => void
  ): void;
  getUsers(
    requestMessage: robocup_pb.GetUsersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetUsersResponse|null) => void
  ): void;
  getUsers(
    requestMessage: robocup_pb.GetUsersRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetUsersResponse|null) => void
  ): void;
  getScoreSheetTemplates(
    requestMessage: robocup_pb.GetScoreSheetTemplatesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetScoreSheetTemplatesResponse|null) => void
  ): void;
  getScoreSheetTemplates(
    requestMessage: robocup_pb.GetScoreSheetTemplatesRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetScoreSheetTemplatesResponse|null) => void
  ): void;
  getTeam(
    requestMessage: robocup_pb.GetTeamRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetTeamResponse|null) => void
  ): void;
  getTeam(
    requestMessage: robocup_pb.GetTeamRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetTeamResponse|null) => void
  ): void;
  createTeam(
    requestMessage: robocup_pb.CreateTeamRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateTeamResponse|null) => void
  ): void;
  createTeam(
    requestMessage: robocup_pb.CreateTeamRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateTeamResponse|null) => void
  ): void;
  getInstitutions(
    requestMessage: robocup_pb.GetInstitutionsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetInstitutionsResponse|null) => void
  ): void;
  getInstitutions(
    requestMessage: robocup_pb.GetInstitutionsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetInstitutionsResponse|null) => void
  ): void;
  updateTeam(
    requestMessage: robocup_pb.UpdateTeamRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.UpdateTeamResponse|null) => void
  ): void;
  updateTeam(
    requestMessage: robocup_pb.UpdateTeamRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.UpdateTeamResponse|null) => void
  ): void;
  getTeams(
    requestMessage: robocup_pb.GetTeamsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetTeamsResponse|null) => void
  ): void;
  getTeams(
    requestMessage: robocup_pb.GetTeamsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetTeamsResponse|null) => void
  ): void;
  createDivision(
    requestMessage: robocup_pb.CreateDivisionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateDivisionResponse|null) => void
  ): void;
  createDivision(
    requestMessage: robocup_pb.CreateDivisionRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateDivisionResponse|null) => void
  ): void;
  createScoreSheetTemplate(
    requestMessage: robocup_pb.CreateScoreSheetTemplateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateScoreSheetTemplateResponse|null) => void
  ): void;
  createScoreSheetTemplate(
    requestMessage: robocup_pb.CreateScoreSheetTemplateRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateScoreSheetTemplateResponse|null) => void
  ): void;
  createUser(
    requestMessage: robocup_pb.CreateUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateUserResponse|null) => void
  ): void;
  createUser(
    requestMessage: robocup_pb.CreateUserRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateUserResponse|null) => void
  ): void;
  updateUser(
    requestMessage: robocup_pb.UpdateUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.UpdateUserResponse|null) => void
  ): void;
  updateUser(
    requestMessage: robocup_pb.UpdateUserRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.UpdateUserResponse|null) => void
  ): void;
  getCheckins(
    requestMessage: robocup_pb.GetCheckinsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetCheckinsResponse|null) => void
  ): void;
  getCheckins(
    requestMessage: robocup_pb.GetCheckinsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetCheckinsResponse|null) => void
  ): void;
  createCheckin(
    requestMessage: robocup_pb.CreateCheckinRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateCheckinResponse|null) => void
  ): void;
  createCheckin(
    requestMessage: robocup_pb.CreateCheckinRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.CreateCheckinResponse|null) => void
  ): void;
  getScoreSheets(
    requestMessage: robocup_pb.GetScoreSheetsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetScoreSheetsResponse|null) => void
  ): void;
  getScoreSheets(
    requestMessage: robocup_pb.GetScoreSheetsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetScoreSheetsResponse|null) => void
  ): void;
  getSheetTeams(
    requestMessage: robocup_pb.GetSheetTeamsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetSheetTeamsResponse|null) => void
  ): void;
  getSheetTeams(
    requestMessage: robocup_pb.GetSheetTeamsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetSheetTeamsResponse|null) => void
  ): void;
  syncCheckins(
    requestMessage: robocup_pb.SyncCheckinsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.SyncCheckinsResponse|null) => void
  ): void;
  syncCheckins(
    requestMessage: robocup_pb.SyncCheckinsRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.SyncCheckinsResponse|null) => void
  ): void;
  getSheetAuthUrl(
    requestMessage: robocup_pb.GetSheetAuthUrlRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetSheetAuthUrlResponse|null) => void
  ): void;
  getSheetAuthUrl(
    requestMessage: robocup_pb.GetSheetAuthUrlRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetSheetAuthUrlResponse|null) => void
  ): void;
  getSheetConfig(
    requestMessage: robocup_pb.GetSheetConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetSheetConfigResponse|null) => void
  ): void;
  getSheetConfig(
    requestMessage: robocup_pb.GetSheetConfigRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.GetSheetConfigResponse|null) => void
  ): void;
  submitSheetConfig(
    requestMessage: robocup_pb.SubmitSheetConfigRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: robocup_pb.SubmitSheetConfigResponse|null) => void
  ): void;
  submitSheetConfig(
    requestMessage: robocup_pb.SubmitSheetConfigRequest,
    callback: (error: ServiceError, responseMessage: robocup_pb.SubmitSheetConfigResponse|null) => void
  ): void;
}

