"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXataClient = exports.XataClient = void 0;
const client_1 = require("@xata.io/client");
const tables = [
    {
        name: "nextauth_users",
        columns: [
            { name: "email", type: "email" },
            { name: "emailVerified", type: "datetime" },
            { name: "name", type: "string" },
            { name: "image", type: "text" },
            { name: "role", type: "string" },
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
        ],
    },
    {
        name: "portraits",
        columns: [
            { name: "mail", type: "email" },
            { name: "portrait", type: "file" },
        ],
    },
];
const DatabaseClient = (0, client_1.buildClient)();
const defaultOptions = {
    databaseURL: "https://Bill-zhanxg-s-workspace-76bknl.ap-southeast-2.xata.sh/db/schoolbox-logger",
};
class XataClient extends DatabaseClient {
    constructor(options) {
        super({ ...defaultOptions, ...options }, tables);
    }
}
exports.XataClient = XataClient;
let instance = undefined;
const getXataClient = () => {
    if (instance)
        return instance;
    instance = new XataClient();
    return instance;
};
exports.getXataClient = getXataClient;
