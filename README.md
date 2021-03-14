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

The project can be run with either dotnet CLI or Visual Studio  2019.

#### Visual Studio

1. Open the `QuizTime.sln` file in Visual Studio as an Administrator.
1. Right click on the solution and click `properties`.
1. Navigate to *Common Properties -> Startup Project*.
1. Click on `Multiple startup projects`.
1. Right next to `QuizTime.Api` select the action `Start Without Debugging`.
1. Right next to `QuizTime.Client` select the action `Start Without Debugging`.
1. Click `OK`.
1. Set the configuration to `Release`.
1. Press `ctrl + F5`.
    - Note: The first launch of the `QuizTime.Client` may take a while because the first time you run the project, `MSBuild` will trigger `npm install` to grab the npm packages. On slower machines this may crash. If that is the case navigate to `QuizTime\QuizTime.Client`, open a terminal and install the NPM packages manually  by typing `npm install`

#### Dotnet CLI

1. Open a terminal with elevated privileges.
1. Navigate to the **QuizTime\QuizTime.Api** folder.
1. type `dotnet run QuizTime.Api.csproj -c Release`
1. Navigate to **QuizTime\QuizTime.Client** folder
1. type `dotnet run QuizTime.Client.csproj -c Release`.
    - Note: This step may take a while the first time you run the project, because `MSBuild` will trigger `npm install` to grab the npm packages.
1. Open a browser and navigate to this URL: https://localhost:7001

### Tests

#### Backend Application

To run the tests for the `QuizTime\QuizTime.Api`either the Dotnet CLI or Visual Studio could be used.
**Visual Studio**
Run the tests from the test explorer.
#### Client Application
Navigate to `QuizTime\QuizTime.Client`. Open a terminal and type `npm run test`

### SQLite Db
The `QuizTime\QuizTime.Api` project also holds the SQLite db instance. All migrations are pre-applied so there is no need to apply them manually. If you need to apply new migrations, you need to do so using the **Entity Framework Core .NET Command-line Tools**.

Navigate to the `QuizTime\QuizTime.Api` folder and open a terminal. 
- To add a migration type: `dotnet-ef migrations add "NAME_OF_MIGRATION"`
- To update the db type: `dotnet ef database update`