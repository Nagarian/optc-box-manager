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



# [1.11.0](https://github.com/Nagarian/optc-box-manager/compare/v1.10.0...v1.11.0) (2020-10-11)


### Features

* add "Export For" Popup to export your box with format compatible to Nakama Network and OPTC-DB Log feature ([82ea766](https://github.com/Nagarian/optc-box-manager/commit/82ea76670944c34672aa902e615cb1ed777b265f)), closes [#46](https://github.com/Nagarian/optc-box-manager/issues/46)
* add Dark Mode theme ([4dbd059](https://github.com/Nagarian/optc-box-manager/commit/4dbd0594dd9bc1681b455fde5d162fb112eea99b))
* **detail:** add tracking of Power Socket ([99cfd3c](https://github.com/Nagarian/optc-box-manager/commit/99cfd3cf5fef2c0cab4eb13dbff5f5e432686d19)), closes [#102](https://github.com/Nagarian/optc-box-manager/issues/102)
* **detail:** rework general layout of the popup ([4e15b6c](https://github.com/Nagarian/optc-box-manager/commit/4e15b6cbaf59f91df001119b8724c25bfbf801f4))
* **detail:** show Power socket into Recap Box ([fd15654](https://github.com/Nagarian/optc-box-manager/commit/fd15654989dd8374b781a6181db29e7d4979167c))
* **filter:** add User Power Socket filter ([9c48fc5](https://github.com/Nagarian/optc-box-manager/commit/9c48fc5a0d84d5bb85fcb13337427fdfdb968028))
* improve Pirate Rumble icons ([a4735c4](https://github.com/Nagarian/optc-box-manager/commit/a4735c4ee96604590f2c7984a1571ffbd052f905))



# [1.10.0](https://github.com/Nagarian/optc-box-manager/compare/v1.9.0...v1.10.0) (2020-10-09)


### Bug Fixes

* issue with slider and browser with "sliding to go back" ([8157b24](https://github.com/Nagarian/optc-box-manager/commit/8157b2473c84fa8914f7a28ef0cda1a3a638668e))
* **detail:** issue with ExpansionPanel and content displayed ([f72d569](https://github.com/Nagarian/optc-box-manager/commit/f72d56900e7a3181c42fd6b14d7c8f9aa44d5c83))


### Features

* **detail:** improve Recap Box display ([3c059f6](https://github.com/Nagarian/optc-box-manager/commit/3c059f621238f52696772d79d2c07eb019368045))
* **search:** add confirmation before deletion of saved search ([2ee959d](https://github.com/Nagarian/optc-box-manager/commit/2ee959d92f868a08febdf768e206b57cd0f8ed38))
* **SugoCleaner:** improve "waiting for" list ([54c3f78](https://github.com/Nagarian/optc-box-manager/commit/54c3f78f89fdbfdd2a4b77ab1ae352f42751ba39)), closes [#108](https://github.com/Nagarian/optc-box-manager/issues/108)
* **SugoCleaner:** show PirateFest info into Recap Box ([b907513](https://github.com/Nagarian/optc-box-manager/commit/b90751391ab9bd168ada9e0cf0bcf60423aeb365)), closes [#108](https://github.com/Nagarian/optc-box-manager/issues/108)
* rework Pirate Rumble icons ([8ad7abb](https://github.com/Nagarian/optc-box-manager/commit/8ad7abb4d1a038dd603991baaf4f656173972e75))



