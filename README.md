# QuizTime

## Prerequsites

1. [Dotnet 5](https://dotnet.microsoft.com/download/dotnet/5.0)
1. [NodeJS](https://nodejs.org/en/download/releases/) 10.16.0
1. [NPM](https://nodejs.org/en/download/releases/) 6.9.0
1. [Angular CLI](https://cli.angular.io/) 11.2.3
1. [Angular](https://cli.angular.io/) 11.2.4

**Optional**
1. [Entity Framework Core .NET Command-line Tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet) - needed only if you plan to run migrations
1. [Visual Studio 2019](https://visualstudio.microsoft.com/vs/)

### Project Setup

The project can be run with either dotnet CLI or Visual Studio.

#### Visual Studio

1. Open the `QuizTime.sln` file in Visual Studio as an Administrator.
1. Right click on the solution and click `properties`.
1. Navigate to *Common Properties -> Startup Project*.
1. Click on `Multiple startup projects`.
1. Right next to `QuizTime.Api` select the action `Start Without Debugging`.
1. Right next to `QuizTime.Client` select the action `Start Without Debugging`.
1. Click `OK`.
1. Choose a `Release` Configuration.
1. Press `ctrl + F5`.
    - Note: The first launch of the `QuizTime.Client` may take a while because the first time you run the project, `MSBuild` will trigger `npm install` to grab the npm packages. On slower machines this may crash. If that is the case navigate to `QuizTime\QuizTime.Client`, open a terminal and install the NPM packages manually  by typing `npm install`

#### Dotnet CLI

1. Open a terminal with elevated privileges.
1. Navigate to **QuizTime\QuizTime.Api**
1. type `dotnet run QuizTime.Api.csproj -c Release`.
1. Navigate to **QuizTime\QuizTime.Client**
1. type `dotnet run QuizTime.Client.csproj -c Release`.
    - Note: This step may take a while because the first time you run the project, `MSBuild` will trigger `npm install` to grab the npm packages.
1. Open a browser and navigate to this URL: https://localhost:7001

### Unit Tests

#### Backend Application

#### Client Application

### SQLite Db