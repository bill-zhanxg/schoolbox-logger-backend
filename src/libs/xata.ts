// Generated by Xata Codegen 0.29.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "nextauth_users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "text" },
      { name: "role", type: "string" },
      { name: "timezone", type: "string", defaultValue: "Australia/Sydney" },
      { name: "auto_timezone", type: "bool", defaultValue: "true" },
    ],
    revLinks: [
      { column: "user", table: "nextauth_accounts" },
      { column: "user", table: "nextauth_users_accounts" },
      { column: "user", table: "nextauth_users_sessions" },
      { column: "user", table: "nextauth_sessions" },
    ],
  },
  {
    name: "nextauth_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "text" },
      { name: "access_token", type: "text" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
    revLinks: [{ column: "account", table: "nextauth_users_accounts" }],
  },
  {
    name: "nextauth_verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "nextauth_users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "account", type: "link", link: { table: "nextauth_accounts" } },
    ],
  },
  {
    name: "nextauth_users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "session", type: "link", link: { table: "nextauth_sessions" } },
    ],
  },
  {
    name: "nextauth_sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
    ],
    revLinks: [{ column: "session", table: "nextauth_users_sessions" }],
  },
  {
    name: "users",
    columns: [
      { name: "accountEnabled", type: "bool" },
      { name: "ageGroup", type: "string" },
      { name: "businessPhones", type: "multiple" },
      { name: "city", type: "string" },
      { name: "createdDateTime", type: "datetime" },
      { name: "department", type: "string" },
      { name: "displayName", type: "string" },
      { name: "givenName", type: "string" },
      { name: "lastPasswordChangeDateTime", type: "datetime" },
      { name: "mail", type: "email" },
      { name: "mailNickname", type: "string" },
      { name: "mobilePhone", type: "string" },
      { name: "onPremisesDistinguishedName", type: "string" },
      { name: "onPremisesSamAccountName", type: "string" },
      { name: "onPremisesSyncEnabled", type: "bool" },
      { name: "postalCode", type: "string" },
      { name: "streetAddress", type: "string" },
      { name: "surname", type: "string" },
      { name: "userType", type: "string" },
      { name: "onPremisesLastSyncDateTime", type: "datetime" },
    ],
  },
  {
    name: "portraits",
    columns: [
      { name: "mail", type: "email" },
      { name: "portrait", type: "file" },
      { name: "schoolbox_id", type: "int" },
      { name: "name", type: "text" },
    ],
  },
  {
    name: "portrait_logs",
    columns: [
      { name: "message", type: "text" },
      { name: "level", type: "string" },
    ],
  },
  {
    name: "users_history",
    columns: [
      { name: "accountEnabled", type: "bool" },
      { name: "ageGroup", type: "string" },
      { name: "city", type: "string" },
      { name: "createdDateTime", type: "datetime" },
      { name: "department", type: "string" },
      { name: "displayName", type: "string" },
      { name: "givenName", type: "string" },
      { name: "lastPasswordChangeDateTime", type: "datetime" },
      { name: "mail", type: "email" },
      { name: "mailNickname", type: "string" },
      { name: "mobilePhone", type: "string" },
      { name: "onPremisesDistinguishedName", type: "string" },
      { name: "onPremisesSamAccountName", type: "string" },
      { name: "onPremisesSyncEnabled", type: "bool" },
      { name: "postalCode", type: "string" },
      { name: "streetAddress", type: "string" },
      { name: "surname", type: "string" },
      { name: "userType", type: "string" },
      { name: "onPremisesLastSyncDateTime", type: "datetime" },
      { name: "user_id", type: "string" },
      { name: "businessPhones", type: "multiple" },
    ],
  },
  {
    name: "user_logs",
    columns: [
      { name: "message", type: "string" },
      { name: "level", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type NextauthUsers = InferredTypes["nextauth_users"];
export type NextauthUsersRecord = NextauthUsers & XataRecord;

export type NextauthAccounts = InferredTypes["nextauth_accounts"];
export type NextauthAccountsRecord = NextauthAccounts & XataRecord;

export type NextauthVerificationTokens =
  InferredTypes["nextauth_verificationTokens"];
export type NextauthVerificationTokensRecord = NextauthVerificationTokens &
  XataRecord;

export type NextauthUsersAccounts = InferredTypes["nextauth_users_accounts"];
export type NextauthUsersAccountsRecord = NextauthUsersAccounts & XataRecord;

export type NextauthUsersSessions = InferredTypes["nextauth_users_sessions"];
export type NextauthUsersSessionsRecord = NextauthUsersSessions & XataRecord;

export type NextauthSessions = InferredTypes["nextauth_sessions"];
export type NextauthSessionsRecord = NextauthSessions & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Portraits = InferredTypes["portraits"];
export type PortraitsRecord = Portraits & XataRecord;

export type PortraitLogs = InferredTypes["portrait_logs"];
export type PortraitLogsRecord = PortraitLogs & XataRecord;

export type UsersHistory = InferredTypes["users_history"];
export type UsersHistoryRecord = UsersHistory & XataRecord;

export type UserLogs = InferredTypes["user_logs"];
export type UserLogsRecord = UserLogs & XataRecord;

export type DatabaseSchema = {
  nextauth_users: NextauthUsersRecord;
  nextauth_accounts: NextauthAccountsRecord;
  nextauth_verificationTokens: NextauthVerificationTokensRecord;
  nextauth_users_accounts: NextauthUsersAccountsRecord;
  nextauth_users_sessions: NextauthUsersSessionsRecord;
  nextauth_sessions: NextauthSessionsRecord;
  users: UsersRecord;
  portraits: PortraitsRecord;
  portrait_logs: PortraitLogsRecord;
  users_history: UsersHistoryRecord;
  user_logs: UserLogsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Bill-zhanxg-s-workspace-76bknl.ap-southeast-2.xata.sh/db/schoolbox-logger",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
