import React, { useEffect } from 'react';
import { useStateValue } from 'react-conflux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InfiniteScroll, Box } from 'grommet';
import FuzzySearch from 'fuzzy-search';

import { BaseButton } from '../../../styles/themes';
import searchIcon from '../../../images/search-icon.svg';
import CredCard from '../Card/CredCard';
import DashboardLoading from '../DashboardLoading';

import {
  studentContext,
  SEARCH_HANDLE_CHANGE
} from '../../../store/reducers/studentReducer';
import { globalContext } from '../../../store/reducers/globalReducer';

const StudentDashboard = ({ history }) => {
  const [studentState, studentDispatch] = useStateValue(studentContext);
  let searchResult = [];
  if (studentState.studentData) {
    const searchTerms = ['credName', 'criteria', 'ownerName', 'issuedOn'];
    const searchOptions = {
      caseSensitive: false
    };
    const searcher = new FuzzySearch(
      studentState.studentData.studentDetails.credentials,
      searchTerms,
      searchOptions
    );
    searchResult = searcher.search(studentState.studentSearchInput);
  }
  const handleChange = e => {
    studentDispatch({ type: SEARCH_HANDLE_CHANGE, payload: e.target.value });
  };
  return (
    <>
      <StudentDetails>
        {studentState.studentDataSuccess ? (
          <h2>{studentState.studentData.studentDetails.fullName}</h2>
        ) : (
          <div />
        )}
        <div>
          <input
            type="text"
            name="searchText"
            placeholder="Search"
            onChange={handleChange}
            value={studentState.studentSearchInput}
          />
        </div>
      </StudentDetails>
      {studentState.studentDataStart ? (
        <DashboardLoading />
      ) : (
        <>
          {studentState.studentDataSuccess && searchResult.length ? (
            <Box height="75vh" overflow="auto">
              <InfiniteScroll items={searchResult} step={10}>
                {item => {
                  return <CredCard key={item.id} cred={item} />;
                }}
              </InfiniteScroll>
            </Box>
          ) : (
            studentState.studentDataSuccess && (
              <NothingFound>
                {!studentState.studentData.studentDetails.credentials.length
                  ? "You don't have any credentials yet..."
                  : 'No results were found..'}
              </NothingFound>
            )
          )}
        </>
      )}
    </>
  );
};

StudentDashboard.propTypes = {
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const StudentDetails = styled.section`
  margin: 50px auto 30px;
  max-width: 1600px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    width: 68%;
    justify-content: flex-end;
    align-items: center;

    input {
      background: white url(${searchIcon}) no-repeat scroll 5px 5px;
      background-size: 20px;
      background-position: right 13px center;
      border: 2px solid ${({ theme }) => theme.global.colors.searchBarBorder};
      color: ${({ theme }) => theme.global.colors.searchBarColor};
      height: 40px;
      margin-right: 1.5%;
      padding: 25px 5% 25px 2.5%;
      transition: 0.25s ease-in-out;
      width: 220px;
      caret-color: grey;
      border-radius: 50px;
      font-size: 1.8rem;

      ::placeholder {
        color: ${({ theme }) => theme.global.colors.searchBarColor};
        font-weight: 700;
      }

      &:focus {
        color: ${({ theme }) => theme.global.colors.brand};
        border-color: ${({ theme }) => theme.global.colors.brand};
        outline: none;
        padding-left: 15px;
        width: 50%;
      }
    }
  }
`;

const IssueCredButton = styled(BaseButton)`
  padding: 12px 15px;
  color: white;
  text-align: right;
  border-radius: 50px;
  margin-left: 2%;
`;

const NothingFound = styled.p`
  width: 100%;
  text-align: center;
  font-size: 2.4rem;
  margin-top: 20vh;
  color: ${({ theme }) => theme.global.colors['status-disabled']};
`;

export default StudentDashboard;