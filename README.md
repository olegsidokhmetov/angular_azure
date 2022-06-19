# Click-Tracker

This aplication demonstrates the utilization of several techniques of the `nrwl` eco-system and has the purpose to provide the means to evaluate basic DEV-OPS skills. The application is built within an [nx-monorepository](https://nx.dev/) and consists of a Web-UI and a Node-API.

## Exercise

Deploy the **server side rendered** `angular` application together with the `nest` backend-api into two seperate **containers** or **virtual-machines**. In Order to do so utilize an `azure` pipeline and the commands provided of the `nx`-monorepository. 

The Pipeline has the following requirements:

* Only process `affected` changes by utilizing [Computation Caching](https://nx.dev/using-nx/caching)
  In order to recognize affected changes utilize the command [nx print-affected](https://nx.dev/cli/print-affected). It will print out a `JSON`-Object which contains a list of changed `dependencies` within each `project` (application & library). You can pass the `--select` command to modify the output.
* Lint and test and build the projects. For that utilize the command [nx run-many](https://nx.dev/cli/run-many). 
* Consider the `target` definitions within the `project.json` of the projects `apps/api` and `apps/demo-app`. Those definitions can be adressed with the `--target` option of the `nx run-many` command. The Configurations within the target-definitions can be utilized with the `--configuration` option. The affected projects can be declared with the `--projects` option.
* Cache the `node_modules` folder after the `npm install`.
* Cache the `node_modules/.cache` folder after after all artifacts have been build. This folder contains all the hashes necessary for the utilization of the `computation caching`


## Requirements

* LTS-Version of nodejs `v16.15`
* Access to `Azure DevOps Services` or `Azure DevOps Server`

