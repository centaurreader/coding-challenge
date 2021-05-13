# coding-challenge

## Introduction

Below are two coding challenges, one focused on backend, the other focused on frontend. Please complete the challenge most appropriate for the role you are applying for.

The challenges are not intended to take a significant amount of time. If you feel like the challenges are taking more than a couple hours to complete, please feel free to reach out to us.

When you are done, please send your code to (coding-challenge@daupler.com). You are welcome to send a zipped folder or share it using Github.

## Backend Challenge: Django Service

Create a Django backend service that allows users to manage their after hours teams. A team is a list of team members, with each team member having a role within its team.

During an emergency, the members of a team will be called one by one according to a specific order.

Here is an example of a team list provided for a customer's "Water Division" team, indicating the roles and call order:

| Name   | Role              |
| ------ | ----------------- |
| Cooper | First Responder   |
| Laura  | Standby Responder |
| Leland | Standby Responder |
| Bob    | Supervisor        |

### Requirements:

- Use Django to create a backend service that can store teams and team members. You can use any library on top of Django that you like. You may use the default SQLite database.

- Your service should have an API that allows users to perform the following actions:

  - View a list of teams, including their members
  - Create new teams
  - Add and remove team members from a team

- Write at least one test, but no more than five. Try to write tests that you feel provide the most value. You do not need to write every test you would write for production-ready code.

## Frontend Challenge: Single Page Application

Imagine a city has a service that helps them keep track of citizen-reported issues such as potholes, graffiti, etc. As issues are reported and their crews respond events are logged to an audit table. Here's a visual example (see also the included [mock data](spa_mock_data.json))

| Division | Issue ID | Event          | Time                 | User     |
| -------- | -------- | -------------- | -------------------- | -------- |
| Water    | 253      | issue_reported | 2017-08-14T11:57:00Z | pgerrard |
| Water    | 253      | issue_acked    | 2017-08-12T12:00:00Z | lucy     |

We would like you to create a single page React application that allows users to interact with this log.

In order to view the log, the user needs to login. Once logged in, the user is allowed to see the entire audit table.

### Requirements:

- Build a single page application using React.
- Include a page with a login form
- Include a page that displays the audit table for authenticated users
- The audit table should have a filter bar at the top that

  - Is always visible while scrolling
  - Filters by events triggered by the viewer
  - Filters by the issue ID

- Use the provided [JSON data](spa_mock_data.json) to mock API calls

### Notes

- You do not need to write any tests
- You do not have to use strict TypeScript

## Alternative: Share an existing project

While we prefer you complete one of the above challenges, we understand there is not always time. In this case we ask that you share something you have already built.

### Requirements

- Explain the problem you were trying to solve

- Share a specific piece of code that you are proud of

- Tell us about something you wish you could change about the project

- What was something you encountered during the project that was deceptively complex?
