import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';

const Issue: React.FC<{
  issueId: number,
  division: string,
  events: Array<{
    time: string,
    user: string,
    event: string,
  }>
}> = ({
  issueId,
  division,
  events,
}) => {
  const [showEventList, setShowEventList] = useState(false);

  const formatDate = (date: string) => `${new Date(date).toLocaleDateString()} at ${new Date(date).toLocaleTimeString()}`;

  return (
    <div className="u-mt-md">
      <Card>
        <div className="u-flex u-flex--row u-flex--space_between">
          <p>
            <span className="issue__value">{issueId}</span>
            <br />
            <span className="issue__label">Issue ID</span>
          </p>
          <p className="text-right">
            <span className="issue__value">{division}</span>
            <br />
            <span className="issue__label">Division</span>
          </p>
        </div>
        <div className="u-mt-xl">
          <p key={`${issueId}-${events[0].time}`}>
            {`${events[0].event} on ${formatDate(events[0].time)} by ${events[0].user}`}
          </p>
          <div className="u-mt-xs">
            <Button link onClick={() => setShowEventList(!showEventList)} type="button">
              {showEventList ? 'Hide Previous Events' : 'Show Previous Events'}
            </Button>
          </div>
          <div className="u-mt-xs">
            {showEventList && events.slice(1).map((event) => (
              <p key={`${issueId}-${event.time}`}>
                {`${event.event} on ${formatDate(event.time)} by ${event.user}`}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Issue;
