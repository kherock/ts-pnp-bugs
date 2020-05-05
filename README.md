# ts-pnp bugs

This repo reproduces existing open issues in
[`ts-pnp`](https://github.com/arcanis/ts-pnp)'s module resolution. A patch with
the changes in [PR #6](https://github.com/arcanis/ts-pnp/pull/6) is included to
demonstrate the current fixes.

## Scenarios

### All existing bugs

ts-pnp fails to resolve files that are masked by a directory with the same name.
For example `lodash/fp` has its typings exported by

```
lodash/
┣ fp/
┃ ┗ *.d.ts
┗ fp.d.ts
```

```console
$ yarn build
...

ERROR in /home/kherock/ts-pnp-bugs/src/index.ts
ERROR in /home/kherock/ts-pnp-bugs/src/index.ts(1,34):
TS2307: Cannot find module 'lodash/fp

...
```

(The build output also makes it very apparent that `./credentials` imported
internally within `aws-sdk` also suffers from this issue.)

### Fix directory masking

To fix, apply the patch for PR #6

```json
  "resolutions": {
    "ts-pnp": "patch:ts-pnp@1.2.0#.yarn/aa84b891e01a6ca6a45e191ed94147699ef827f9.patch"
  }
```

There should only be one build error remaining at this point.

### Importing JSON with incremental API

Enabling `useTypescriptIncrementalApi` in `fork-ts-checker-webpack-plugin`
breaks importing JSON, I have not researched the cause of this yet.

```console
$ yarn build
...

ERROR in /home/kherock/ts-pnp-bugs/src/index.ts
ERROR in /home/kherock/ts-pnp-bugs/src/index.ts(3,18):
TS2307: Cannot find module './test.json'.
```

To fix, uncomment the line disabling the option in
[`webpack.config.js`](webpack.config.js).
