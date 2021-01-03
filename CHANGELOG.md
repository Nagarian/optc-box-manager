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



# [1.9.0](https://github.com/Nagarian/optc-box-manager/compare/v1.8.0...v1.9.0) (2020-09-27)


### Bug Fixes

* **search:** iOS sorter display issue ([77f4680](https://github.com/Nagarian/optc-box-manager/commit/77f46801c545d0730c0a48c5b91c729a967eca8f))
* rename Pirate Festival to Pirate Rumble ([a5ceb5a](https://github.com/Nagarian/optc-box-manager/commit/a5ceb5af3c135c72340339e7c48e124ccb5f4b6a))
* uniformisation of border widths ([3573230](https://github.com/Nagarian/optc-box-manager/commit/35732302935de1928a302af7255d136649c42b8c))
* **bulk edit:** issue when bulk editing LB+ and declared as Rainbow ([0d3825e](https://github.com/Nagarian/optc-box-manager/commit/0d3825e8606741f39c28c87fe9c04b491c0b4ada)), closes [#87](https://github.com/Nagarian/optc-box-manager/issues/87)
* **gather island:** rename stone to monument ([c24c0ef](https://github.com/Nagarian/optc-box-manager/commit/c24c0efdffa10c0222446a94497364bbe4501889))
* renaming of Pirate Fest style on OPTC-DB ([1bab14a](https://github.com/Nagarian/optc-box-manager/commit/1bab14ad13ee1f29579e42f3a5fd2b64357862e9))


### Features

* **detail:** move Delete and Open in DB into the popup action ([f64fd8b](https://github.com/Nagarian/optc-box-manager/commit/f64fd8bdf21b6c2ea54b1e4d893bad6a9c43253f))
* **sort:** add option to Rarity filter to allow treat super-evolved and evolved as equal (⭐+ = ⭐) ([89e8a75](https://github.com/Nagarian/optc-box-manager/commit/89e8a7594ccda6b50e3d28d5c808fd483634e331))
* add delete icon ([b167008](https://github.com/Nagarian/optc-box-manager/commit/b16700863f7b931322065d4362e80fdb1ad70188))
* **sorter:** add "Added to Box" sorter ([91f644a](https://github.com/Nagarian/optc-box-manager/commit/91f644ad47319980a8a6e13018cb6c8826dc7994))



# [1.8.0](https://github.com/Nagarian/optc-box-manager/compare/v1.7.2...v1.8.0) (2020-09-24)


### Features

* **box:** add id to units title (when you hover it with a mouse) ([4e5b628](https://github.com/Nagarian/optc-box-manager/commit/4e5b628c0e05c7b76e1efc2e5e9d8a6ff09d8022))
* **detail:** add PirateFest Special & Ability edition ([036f02f](https://github.com/Nagarian/optc-box-manager/commit/036f02f8aad34069a423c0697596aa60c45c574c))
* **displayer:** add PirateFest displayer ([6732670](https://github.com/Nagarian/optc-box-manager/commit/6732670272309f9c80ce6f090178f930d9d7a2eb))
* **filter:** add Pirate Fest Style filter ([1e629a6](https://github.com/Nagarian/optc-box-manager/commit/1e629a64434a2f34ac5dc7670f22575aca17074f))
* **filter:** add Pirate Festival drop filter ([3bf99d4](https://github.com/Nagarian/optc-box-manager/commit/3bf99d4cb77cf7f552357720b5a2d05be9107747)), closes [#49](https://github.com/Nagarian/optc-box-manager/issues/49)
* **filter:** add PirateFest Special & Ability Level filter ([14e31ce](https://github.com/Nagarian/optc-box-manager/commit/14e31ce467b778a9fc99bc84b126d1fd828bac29))
* **filter:** add PirateFest syncer ([e31dadc](https://github.com/Nagarian/optc-box-manager/commit/e31dadce482f4ba9b1ccda7da2ffd7aa6c0fd725))
* **filter:** improve unit Classes images ([f6152c7](https://github.com/Nagarian/optc-box-manager/commit/f6152c7c039fb10ce6e41321579e3fce748c7243))
* **filter:** rework Cotton Candy filter for update 10.0 ([25f5008](https://github.com/Nagarian/optc-box-manager/commit/25f500822a8936aaff383563eff5445851668749))
* **sort:** add PirateFest sorting ([0acdeca](https://github.com/Nagarian/optc-box-manager/commit/0acdeca09b5e701b9cc73f542415a0dc3d2712f9))



