import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import MockService, { Log } from '../api/MockService';
import Button from '../components/Button';
import Issue from '../components/Issue';
import PillList, { ListItem } from '../components/PillList';
import TextInput from '../components/TextInput';
import { eventToHumanReadableLabel } from '../utils/IssueHelper';
import FilterBar from '../components/FilterBar';

const Audit = () => {
  const [filter, setFilter] = useState('');
  const [filterUserEvents, setFilterUserEvents] = useState(false);

  const [selectedEvents, setSelectedEvents] = useState<ListItem[]>([]);
  const getEventsList = (log: Log[]) => log
    .reduce((result, curr) => Array.from(new Set([...result, curr.event])), [] as string[])
    .map((item) => eventToHumanReadableLabel(item))
    .map((item) => ({
      label: item,
      selected: !!selectedEvents.find((selectedEvent) => selectedEvent.label === item),
      id: item,
    }))
    .sort((l, r) => {
      if (l.label > r.label) {
        return 1;
      }
      if (l.label < r.label) {
        return -1;
      }
      return 0;
    });
  const updateSelectedEvents = (eventItem: ListItem) => {
    setSelectedEvents((state) => {
      const itemInList = state.find((item) => item.id === eventItem.id);
      if (itemInList) {
        return state.filter((item) => item !== itemInList);
      }
      return [
        ...state,
        eventItem,
      ];
    });
  };

  const [serverError, setServerError] = useState('');
  const [data, setData] = useState<Log[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await MockService.getAuditData();
        setData(response);
      } catch (error) {
        setServerError(error.message);
      }
    };
    getData();
  }, []);

  const { user } = useAuth();
  const processLogs = (log: Log[]) => log
    .sort((l, r) => {
      if (l.time > r.time) {
        return -1;
      }
      if (l.time < r.time) {
        return 1;
      }
      return 0;
    })
    .map((entry) => ({ ...entry, event: eventToHumanReadableLabel(entry.event) }))
    .filter((entry) => entry.issue_id.toString().toLowerCase().includes(filter.toLowerCase()))
    .reduce((result, curr) => {
      const entryInList = result.find((entry) => entry.issueId === curr.issue_id);
      if (entryInList) {
        return [
          ...result.filter((entry) => entry !== entryInList),
          {
            ...entryInList,
            events: [
              ...entryInList.events,
              curr,
            ],
          },
        ];
      }
      return [
        ...result,
        {
          issueId: curr.issue_id,
          division: curr.division,
          events: [curr],
        },
      ];
    }, [] as Array<{ issueId: number, division: string, events: Log[] }>)
    .filter((entry) => (filterUserEvents
      ? entry.events.some((event) => event.user === user.user.username) : true))
    .filter((issue) => selectedEvents
      .every((selectedEvent) => issue.events
        .find((issueEvent) => issueEvent.event === selectedEvent.label)));

  const { signOut } = useAuth();
  const { push } = useHistory();
  const logout = () => {
    signOut();
    push('/login');
  };

  return (
    <div>
      <div className="u-flex u-flex--row">
        <h1 className="title1 u-mb-lg u-flex--1">Audit Log</h1>
        <div className="u-flex--0 u-flex--align_center">
          <Button onClick={logout} secondary>
            Log Out
          </Button>
        </div>
      </div>

      {serverError ? <p className="text-error text-center">{serverError}</p> : null}

      <FilterBar>
        <TextInput
          id="filter"
          label="Issue ID"
          onChange={(event) => setFilter(event.target.value)}
          value={filter}
        />

        <div className="u-mt-md">
          <PillList
            onClick={updateSelectedEvents}
            list={getEventsList(data || [])}
          />
        </div>

        <div className="u-mt-md">
          <Button
            pill={filterUserEvents}
            pillHollow={!filterUserEvents}
            onClick={() => setFilterUserEvents(!filterUserEvents)}
          >
            Only My Events
          </Button>
        </div>
      </FilterBar>

      {data && processLogs(data).map((entry) => (
        <Issue
          key={entry.issueId}
          issueId={entry.issueId}
          division={entry.division}
          events={entry.events}
        />
      ))}
    </div>
  );
};

export default Audit;
