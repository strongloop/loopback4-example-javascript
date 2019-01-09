# LoopBack 4 application in JavaScript

A POC in developing LoopBack 4 applications using JavaScript.

The branches `stage-a`, `stage-b` etc are steps that were taken to reach the final stage.

1. `stage-a`: Got a basic app running

- Files copied and set up from JS files emitted by TS
- Only code change -> ../../public ../public
- App is up
- /explorer available -> components work
- /ping available -> controllers work
- / loads -> - static assets served
- Code is messy for "human consumption" :D

2. `stage-b`: Optimized code for "human consumption"

- Created helper file for common utility functions
- Functionality intact

3. `stage-c`: Custom route

- /hi -> custom route works

4. `stage-d`: Added a model

- Created model
- Created datasource
- Created repository
- Created controller
- Code is messy for "human consumption"

5. `stage-e`: Optimize code for "human consumption"

- Model related files cleaned up and optimized
- Model and functionality intact

6. TODO: further optimization where `decorate`, `metadata`, and `param` are used.

---

Copyright IBM Corp. 2017,2018. All Rights Reserved.
This file is licensed under the MIT License.
License text available at https://opensource.org/licenses/MIT
