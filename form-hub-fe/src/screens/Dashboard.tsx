import { gql, useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { startCase, uniq } from 'lodash';
import React from 'react';
import { SubmissionsQuery } from '../generated/graphql';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: calc(100vw - 2.4rem);
  margin: 0 auto;
  text-align: center;
  justify-content: center;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
`;

const Button = styled.button`
  background: black;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 15px;
  cursor: pointer;
`;

const GET_SUBMISSIONS = gql`
  query Submissions {
    submissions {
      id
      submittedAt
      data
    }
  }
`;

const GENERATE_SUBMISSIONS = gql`
  mutation GenerateSubmissions($count: Int!) {
    queueSubmissionGeneration(count: $count)
  }
`;

const Dashboard: React.FC = () => {
  const { data, error, loading, refetch } =
    useQuery<SubmissionsQuery>(GET_SUBMISSIONS);

  const [generateSubmissions] = useMutation(GENERATE_SUBMISSIONS, {
    variables: { count: 5 },
  });

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error.message}</Container>;

  const { submissions } = data!;
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'submittedAt', headerName: 'Submitted', width: 200 },
    ...uniq(submissions.flatMap((s) => Object.keys(s.data))).map((field) => ({
      field,
      headerName: startCase(field),
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.data[field],
    })),
  ];

  return (
    <Container>
      <Toolbar>
        <Button
          onClick={async () => {
            await generateSubmissions();
            refetch();
          }}
        >
          Generate Submissions
        </Button>
      </Toolbar>
      <DataGrid
        rows={submissions}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            pageSize: 25,
          },
        }}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default Dashboard;
