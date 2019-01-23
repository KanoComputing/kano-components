# \<kwc-share-player\>

A set of players (viewers) for each category of kano app share. 

## Installation
Clone this repository.
Run `bower i`

This component contains the `kano-code` repo as a submodule to allow it to pull across some files on which it depends. The intetion is that this submodule will be reomved once the `kano-code` project is published as a library for use across the kano projects.

In order to get the submodule up and running you need to run two git commands when you clone this repo.
```sh
$ git submodule init
$ git submodule update
```

Finally there is a `bash` script that will pull across the files that this repo depends on from the submodule. 

```sh
$ ./scripts/build-kcode-lib.sh
```

So the intention is not to directly use the `kano-code` submodule in the development on this component, but insted to have it available and set the the correct commit so that just the files that this components depends on can be pulled across in a manual process.
## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test --skip-plugin junit-reporter
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
