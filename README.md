# snyk-task
A web service that, given a name of an npm package returns its dependent packages.

## Installation

`npm install`

## Run
### Server
`npm run watch-server`
### Request
`GET` to `/packages/{name}/{versionOrTag}/tree`
Default port is `5745`

The response should look like this:
```javascript
{
  name: "name",
  version: "version",
  key: "key",
  dependencies: [
    {name: "name1", "version: "version1", ...}
    ...
  ]
}
```
- `name` - The package name (e.g. `snyk-task`)
- `version` - The package version (e.g. `1.0.0`)
- `key` - The `db` key (e.g. `snyk-task@1.0.0`)
- `dependencies` - The dependencies of the package. Usually contains an array of dependencies (`[]` if there aren't any). If an error has occured when asking for the package's data it will be an empty object (`{}`). It'll also be an empty object if the server has reached the level to fetch to.

## Further Notes

* With each dependency, a request to the `npm-registry` is performed. The returned data is being cached to a `redis` database (default port is `6379`). In order to free up the db just `npm run clean-cache`.
* The server returns the dependencies tree of a package, considering both `dependencies` and `devDependencies`.

### Future Features

* Add tests.
* Add `/packages/{name}/{versionOrTag}/list` to return a simple list of dependencies rather than a tree.
* Add a proper logger.
* Add more specific validations to make the request fully covered.
* Make a `boolean` for `fetchDependencies` and `fetchDevDependencies`.
* Make the level to fetch to a configurable variable.
* Decide on a valid and more relevant version when a version range is requested. Currently it just chooses the minimal version possible, i.e. `~1.0.0` will be `1.0.0`.