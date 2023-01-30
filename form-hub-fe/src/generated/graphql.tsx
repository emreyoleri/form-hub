import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Query = {
  __typename?: 'Query';
  submissions: Array<Submission>;
};

export type Submission = {
  __typename?: 'Submission';
  data: Scalars['JSON'];
  id: Scalars['ID'];
  submittedAt: Scalars['DateTime'];
};

export type SubmissionsQueryVariables = Exact<{ [key: string]: never }>;

export type SubmissionsQuery = {
  __typename?: 'Query';
  submissions: Array<{
    __typename?: 'Submission';
    id: string;
    submittedAt: any;
    data: any;
  }>;
};

export const SubmissionsDocument = gql`
  query Submissions {
    submissions {
      id
      submittedAt
      data
    }
  }
`;
