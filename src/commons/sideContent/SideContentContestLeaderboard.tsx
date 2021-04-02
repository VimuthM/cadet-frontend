import { Button, Collapse, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Tooltip2 } from '@blueprintjs/popover2';
import React, { useMemo, useState } from 'react';

import { ContestEntry } from '../assessment/AssessmentTypes';
import SideContentLeaderboardCard from './SideContentLeaderboardCard';

export type SideContentContestLeaderboardProps = DispatchProps & StateProps;

type DispatchProps = {
  handleContestEntryClick: (submissionId: number, answer: string) => void;
};

type StateProps = {
  orderedContestEntries: ContestEntry[];
};

/*
Contest Leaderboard inner components
*/
const columnHeader = (colClass: string, colTitle: string) => (
  <div className={colClass}>
    {colTitle}
    <Icon icon={IconNames.CARET_DOWN} />
  </div>
);

const contestEntryHeader = (
  <div className="contestentries-header">
    {columnHeader('header-entryid', 'Student Name')}
    {columnHeader('header-entryrank', 'Rank')}
  </div>
);

const contestLeaderboardTooltipContent = 'View the top-rated contest entries!';

const SideContentContestLeaderboard: React.FunctionComponent<SideContentContestLeaderboardProps> = props => {
  const { orderedContestEntries, handleContestEntryClick } = props;
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(true);

  const contestEntryCards = useMemo(
    () => (
      <div>
        {contestEntryHeader}
        {orderedContestEntries.map((contestEntry: ContestEntry, index: number) => (
          <SideContentLeaderboardCard
            key={contestEntry.submission_id}
            handleContestEntryClick={handleContestEntryClick}
            contestEntry={contestEntry}
            rank={index + 1}
          />
        ))}
      </div>
    ),
    [handleContestEntryClick, orderedContestEntries]
  );

  return (
    <div className="ContestLeaderboard">
      <Button
        className="collapse-button"
        icon={showLeaderboard ? IconNames.CARET_DOWN : IconNames.CARET_RIGHT}
        minimal={true}
        onClick={() => setShowLeaderboard(!showLeaderboard)}
      >
        <span>Contest Leaderboard</span>
        <Tooltip2 content={contestLeaderboardTooltipContent}>
          <Icon icon={IconNames.HELP} />
        </Tooltip2>
      </Button>
      <Collapse isOpen={showLeaderboard} keepChildrenMounted>
        {contestEntryCards}
      </Collapse>
    </div>
  );
};

export default SideContentContestLeaderboard;
