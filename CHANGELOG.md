## [2.3.1](https://github.com/Nagarian/optc-box-manager/compare/v2.3.0...v2.3.1) (2021-04-07)


### Bug Fixes

* issue with safari ([d3a66e5](https://github.com/Nagarian/optc-box-manager/commit/d3a66e59cbeafb8519f1fbda177f2760f125a44d))



# [2.3.0](https://github.com/Nagarian/optc-box-manager/compare/v2.2.0...v2.3.0) (2021-03-27)


### Features

* **detail:** add Inkable tracker ([4d7e5a1](https://github.com/Nagarian/optc-box-manager/commit/4d7e5a155b8a979768f3ed81e2eb195fc9e8bdd5)), closes [#188](https://github.com/Nagarian/optc-box-manager/issues/188)
* **filter:** add Dual and Versus Type filter ([1bce1a1](https://github.com/Nagarian/optc-box-manager/commit/1bce1a11ba0daa32587f1eaa84e992ce93e22a11))
* **filter:** add filter and sorter for Ink characters ([e78c08c](https://github.com/Nagarian/optc-box-manager/commit/e78c08cb3a10da7e6e377dcbebbede9fab7de334))



# [2.2.0](https://github.com/Nagarian/optc-box-manager/compare/v2.1.0...v2.2.0) (2021-03-07)


### Bug Fixes

* disable image caching until we found a decent solutions ([7ccbd38](https://github.com/Nagarian/optc-box-manager/commit/7ccbd38cdd088ded31d89de085fc5780a330eb0c))
* issue with image caching which prevent whole application update (quota storage issue) ([de57cfb](https://github.com/Nagarian/optc-box-manager/commit/de57cfb57c6fd7c037c8ffeb0c72c4800b7b9f6f))


### Features

* **filter:** add support rarecruit filter ([62990a3](https://github.com/Nagarian/optc-box-manager/commit/62990a33e25f7972e22419084a36e2842a86738e))
* **settings:** rework Settings layout + add App Management screen ([d53aac3](https://github.com/Nagarian/optc-box-manager/commit/d53aac36417c53f1c8c86f01985c70882d77e459))
* **settings:** rework settings page + add Clear cache feature ([ebec55b](https://github.com/Nagarian/optc-box-manager/commit/ebec55b30d611be17427a3aa0e5e82a2a4e5cb75))
* add Discord, Share and News-Coo icons ([c34957a](https://github.com/Nagarian/optc-box-manager/commit/c34957a20bd1e5421fcaf1cbc2c876e5d26950e2))



# [2.1.0](https://github.com/Nagarian/optc-box-manager/compare/v2.0.0...v2.1.0) (2021-02-06)


### Bug Fixes

* **db:** renaming of Nutrition/Hunger reduction to Nutrition/Reduce Hunger duration ([0b87e5c](https://github.com/Nagarian/optc-box-manager/commit/0b87e5c0668aaa7baec913a88369b09fe44770dd))
* **detail:** improve diff highlighting ([454d989](https://github.com/Nagarian/optc-box-manager/commit/454d9898dcea5107a9bb4d6fc7d67fcc830f9dbf))
* **filters:** reorganize Potentials the same way as in the game ([1ed1744](https://github.com/Nagarian/optc-box-manager/commit/1ed1744ad0f44878320f06de60eed9a85b82c238))


### Features

* **detail:** add button to improve cotton candy editing ([520cdc9](https://github.com/Nagarian/optc-box-manager/commit/520cdc98e7e91e84892e5f20b3cc10d28a4b217e))
* **filter:** add Arena Drop Location filter ([6dc5800](https://github.com/Nagarian/optc-box-manager/commit/6dc5800eea691bbf17e24a0c2851277dffc2ece1))
* **filter:** add limited rarerecruit filters (TM/KK/PR) ([6fe4917](https://github.com/Nagarian/optc-box-manager/commit/6fe4917052fcbcf7fc8b5570f009e551082eb31b))



# [2.0.0](https://github.com/Nagarian/optc-box-manager/compare/v1.12.1...v2.0.0) (2021-01-03)


### Bug Fixes

* **db:** issue with id modification and evolutionMap ([640b1ff](https://github.com/Nagarian/optc-box-manager/commit/640b1ff75fc6d203a3b6e562025711791fc9c91d))
* units database discrepancy with in-game ids ([dfb0128](https://github.com/Nagarian/optc-box-manager/commit/dfb01289253f8d89d2a7d267f7e26193226220ef))


### Features

* **bulk-edit:** add Global-Japan Id Converter ([def4749](https://github.com/Nagarian/optc-box-manager/commit/def47495a7f5b150929ca140dd8bc8bc4c7d5175))
* change default Search value of Sugo Cleaner and Add Screen for new users ([2a0292b](https://github.com/Nagarian/optc-box-manager/commit/2a0292b0697a691f94bbec3b45a64c34a429840f))
* **db:** add real image of characters 5001-5008 ([a616366](https://github.com/Nagarian/optc-box-manager/commit/a616366d39f85ebb3c7e34b035bb03ef9edbe07b))
* **filter:** rework game version filter ([b2edbb8](https://github.com/Nagarian/optc-box-manager/commit/b2edbb847de8c78f1d3a1aab16a31688e482d92b))
* add characters images caching strategy ([d625035](https://github.com/Nagarian/optc-box-manager/commit/d62503532a46ac54269d73952a27b558dba0c88f))
* rework OPTC-DB dependency + add loading screen on application start ([079ff4f](https://github.com/Nagarian/optc-box-manager/commit/079ff4fd1f53a86bedad48b8177223107da6d2f1))


### BREAKING CHANGES

* rework of the ids, we now use the in-game ids instead of the DB ones. Which mean:

- all global-only units have their ids updated to match those of the game
- Glo-first units which have been released later on Japan version are now displayed along-side their japan counter-side
- ids in the OPTC-BM export format are not compatible with DB-ids anymore (they are those of the game) NB: this doesn't affect "Export For" feature



## [1.12.1](https://github.com/Nagarian/optc-box-manager/compare/v1.12.0...v1.12.1) (2020-12-24)


### Bug Fixes

* **detail:** default value of Power Socket is now based around the value of the first one. ([b89bc86](https://github.com/Nagarian/optc-box-manager/commit/b89bc86b19658351370af0792c06384c97f3c074))
* **sorter:** display issue when deleting a sorter ([f36b23c](https://github.com/Nagarian/optc-box-manager/commit/f36b23c80539181df677fc6e2165cf95363f132f))
* **syncer:** issue with multiple sorters of cotton candy. Now only one sorter will be updated when changing of CC type filter ([ab39852](https://github.com/Nagarian/optc-box-manager/commit/ab398529af9ed7f736d1cc7f1b3e8d7274651101))
* **syncer:** issue with multiple sorters of potentials. Now only one sorter will be updated when changing of Potential type filter ([c76e41b](https://github.com/Nagarian/optc-box-manager/commit/c76e41b687ed2225533155a80879084a37e393aa))



# [1.12.0](https://github.com/Nagarian/optc-box-manager/compare/v1.11.0...v1.12.0) (2020-11-28)


### Bug Fixes

* **displayer:** uniformisation of cotton candy display order (HP/ATK/RCV instead of ATK/HP/RCV) ([9737475](https://github.com/Nagarian/optc-box-manager/commit/97374754f036a6c428fd317932ae53c5f3658e3c))
* **gather island:** uniformisation of cotton candy display order (HP/ATK/RCV instead of RCV/HP/ATK) ([2ba5370](https://github.com/Nagarian/optc-box-manager/commit/2ba537043f565954d9032b41f0734660488546d7))
* **search:** dark theme issue with Save Search box ([b50f1ee](https://github.com/Nagarian/optc-box-manager/commit/b50f1ee0f0532a9e3cb43ff2b35fcf86f93361e0))
* **units:** Akainu GloFirst has changed id 3385 -> 3157 following their release in Japan version ([b80fe0d](https://github.com/Nagarian/optc-box-manager/commit/b80fe0d6a65d6316426697294bdbdb8812ee7766))


### Features

* **detail:** add diff highlighter to show the difference between two levels of support, potentials or captain ability ([a929e5c](https://github.com/Nagarian/optc-box-manager/commit/a929e5c2c0622475c5d0ff74efdd8a87e80bba0e))
* **syncer:** improve CottonCandy syncer ([9ffa72a](https://github.com/Nagarian/optc-box-manager/commit/9ffa72a2a5e717bfaa47a6641c08fc49f381cb67))



