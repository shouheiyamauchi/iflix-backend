const seedData = [
  {
    'model': 'User',
    'documents': [
      {"_id":"5a783a21fb485729ea739130","role":"admin","created":"2018-02-05T11:04:01.210Z","updated":"2018-02-05T11:04:01.212Z","username":"admin","password":"password","__v":0},
      {"_id":"5a783db9fb485729ea739141","role":"user","created":"2018-02-05T11:19:21.236Z","updated":"2018-02-05T11:19:21.237Z","username":"iflix_user","password":"password","__v":0},
      {"_id":"5a783e2cfb485729ea739142","role":"user","created":"2018-02-05T11:21:16.876Z","updated":"2018-02-05T11:21:16.876Z","username":"shouhei","password":"password","__v":0},
      {"_id":"5a783e4cfb485729ea739143","role":"user","created":"2018-02-05T11:21:48.856Z","updated":"2018-02-05T11:21:48.856Z","username":"john","password":"password","__v":0},
      {"_id":"5a815cd002d2933f7c889402","role":"user","created":"2018-02-12T09:22:24.181Z","updated":"2018-02-12T09:22:24.240Z","username":"green","password":"password","__v":0},
      {"_id":"5a815d9b02d2933f7c889403","role":"user","created":"2018-02-12T09:25:47.483Z","updated":"2018-02-12T09:25:47.485Z","username":"goshi","password":"password","__v":0},
      {"_id":"5a815de302d2933f7c889404","role":"user","created":"2018-02-12T09:26:59.228Z","updated":"2018-02-12T09:26:59.228Z","username":"weird_username","password":"pass*\u0026 HEl++////\\\\","__v":0},
      {"_id":"5a82c9c676ee7f268e16531b","role":"user","created":"2018-02-13T11:19:34.373Z","updated":"2018-02-13T11:19:34.375Z","username":"testuser","password":"testpassword","__v":0},
      {"_id":"5a82ccd776ee7f268e165320","role":"user","created":"2018-02-13T11:32:39.429Z","updated":"2018-02-13T11:32:39.429Z","username":"Admin","password":"password","__v":0},
      {"_id":"5a82d3dcef016cb3690688d6","role":"user","created":"2018-02-13T12:02:36.184Z","updated":"2018-02-13T12:02:36.193Z","username":"shouhei2","password":"password","__v":0},
      {"_id":"5a82de54e82da312def865ac","role":"user","created":"2018-02-13T12:47:16.889Z","updated":"2018-02-13T12:47:16.891Z","username":"Green","password":"Green","__v":0}
    ]
  },
  {
    'model': 'Content',
    'documents': [
      {"_id":"5a783b8cfb485729ea739131","created":"2018-02-05T11:10:04.257Z","updated":"2018-02-05T11:10:04.257Z","title":"The Godfather","description":"When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.","genre":"Crime","releaseDate":"1972-11-01T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783c22fb485729ea739132","created":"2018-02-05T11:12:34.058Z","updated":"2018-02-05T11:12:34.058Z","title":"The Shawshank Redemption","description":"Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.","genre":"Crime","releaseDate":"1995-02-15T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783c5cfb485729ea739134","created":"2018-02-05T11:13:32.394Z","updated":"2018-02-05T11:13:32.394Z","title":"Schindler's List","description":"Oskar Schindler is a vainglorious and greedy German businessman who becomes an unlikely humanitarian amid the barbaric German Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament to the good in all of us.","genre":"Biography","releaseDate":"1994-02-09T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783c97fb485729ea739135","created":"2018-02-05T11:14:31.090Z","updated":"2018-02-05T11:14:31.091Z","title":"Raging Bull","description":"When Jake LaMotta steps into a boxing ring and obliterates his opponent, he's a prizefighter. But when he treats his family and friends the same way, he's a ticking time bomb, ready to go off at any moment. Though LaMotta wants his family's love, something always seems to come between them. Perhaps it's his violent bouts of paranoia and jealousy. This kind of rage helped make him a champ, but in real life, he winds up in the ring alone.","genre":"Biography","releaseDate":"1981-02-25T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjRmODkzNDItMTNhNi00YjJlLTg0ZjAtODlhZTM0YzgzYThlXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783cb1fb485729ea739136","created":"2018-02-05T11:14:57.282Z","updated":"2018-02-05T11:14:57.282Z","title":"Casablanca","description":"The story of Rick Blaine, a cynical world-weary ex-patriate who runs a nightclub in Casablanca, Morocco during the early stages of WWII. Despite the pressure he constantly receives from the local authorities, Rick's cafe has become a kind of haven for refugees seeking to obtain illicit letters that will help them escape to America. But when Ilsa, a former lover of Rick's, and her husband, show up to his cafe one day, Rick faces a tough challenge which will bring up unforeseen complications, heartbreak and ultimately an excruciating decision to make.","genre":"Drama","releaseDate":"1944-06-14T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783cc8fb485729ea739137","created":"2018-02-05T11:15:20.425Z","updated":"2018-02-05T11:15:20.425Z","title":"Citizen Kane","description":"A group of reporters are trying to decipher the last word ever spoken by Charles Foster Kane, the millionaire newspaper tycoon: \"Rosebud.\" The film begins with a news reel detailing Kane's life for the masses, and then from there, we are shown flashbacks from Kane's life. As the reporters investigate further, the viewers see a display of a fascinating man's rise to fame, and how he eventually fell off the top of the world.","genre":"Drama","releaseDate":"1941-09-03T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783ce7fb485729ea739138","created":"2018-02-05T11:15:51.456Z","updated":"2018-02-05T11:15:51.456Z","title":"Gone with the Wind","description":"Scarlett is a woman who can deal with a nation at war, Atlanta burning, the Union Army carrying off everything from her beloved Tara, the carpetbaggers who arrive after the war. Scarlett is beautiful. She has vitality. But Ashley, the man she has wanted for so long, is going to marry his placid cousin, Melanie. Mammy warns Scarlett to behave herself at the party at Twelve Oaks. There is a new man there that day, the day the Civil War begins. Rhett Butler. Scarlett does not know he is in the room when she pleads with Ashley to choose her instead of Melanie.","genre":"Drama","releaseDate":"1940-04-30T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BYWQwOWVkMGItMDU2Yy00YjIzLWJkMjEtNmVkZjE3MjMwYzEzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783cf6fb485729ea739139","created":"2018-02-05T11:16:06.919Z","updated":"2018-02-05T11:16:06.919Z","title":"The Wizard of Oz","description":"In this charming film based on the popular L. Frank Baum stories, Dorothy and her dog Toto are caught in a tornado's path and somehow end up in the land of Oz. Here she meets some memorable friends and foes in her journey to meet the Wizard of Oz who everyone says can help her return home and possibly grant her new friends their goals of a brain, heart and courage.","genre":"Adventure","releaseDate":"1940-04-17T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BNjUyMTc4MDExMV5BMl5BanBnXkFtZTgwNDg0NDIwMjE@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d0cfb485729ea73913a","created":"2018-02-05T11:16:28.322Z","updated":"2018-02-05T11:16:28.322Z","title":"One Flew Over the Cuckoo's Nest","description":"McMurphy has a criminal past and has once again gotten himself into trouble and is sentenced by the court. To escape labor duties in prison, McMurphy pleads insanity and is sent to a ward for the mentally unstable. Once here, McMurphy both endures and stands witness to the abuse and degradation of the oppressive Nurse Ratched, who gains superiority and power through the flaws of the other inmates. McMurphy and the other inmates band together to make a rebellious stance against the atrocious Nurse.","genre":"Drama","releaseDate":"1976-03-31T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d1cfb485729ea73913b","created":"2018-02-05T11:16:44.754Z","updated":"2018-02-05T11:16:44.754Z","title":"Lawrence of Arabia","description":"Due to his knowledge of the native Bedouin tribes, British Lieutenant T.E. Lawrence is sent to Arabia to find Prince Faisal and serve as a liaison between the Arabs and the British in their fight against the Turks. With the aid of native Sherif Ali, Lawrence rebels against the orders of his superior officer and strikes out on a daring camel journey across the harsh desert to attack a well-guarded Turkish port. ","genre":"Adventure","releaseDate":"1963-10-31T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BYWY5ZjhjNGYtZmI2Ny00ODM0LWFkNzgtZmI1YzA2N2MxMzA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UY268_CR2,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d2cfb485729ea73913c","created":"2018-02-05T11:17:00.987Z","updated":"2018-02-05T11:17:00.987Z","title":"Vertigo","description":"John \"Scottie\" Ferguson is a retired San Francisco police detective who suffers from acrophobia and Madeleine is the lady who leads him to high places. A wealthy shipbuilder who is an acquaintance from college days approaches Scottie and asks him to follow his beautiful wife, Madeleine. He fears she is going insane, maybe even contemplating suicide, he believes she is possessed by a dead ancestor. Scottie is skeptical, but agrees after he sees the beautiful Madeleine.","genre":"Mystery","releaseDate":"1958-07-20T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BYTE4ODEwZDUtNDFjOC00NjAxLWEzYTQtYTI1NGVmZmFlNjdiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d3bfb485729ea73913d","created":"2018-02-05T11:17:15.000Z","updated":"2018-02-05T11:17:15.000Z","title":"Psycho","description":"Phoenix officeworker Marion Crane is fed up with the way life has treated her. She has to meet her lover Sam in lunch breaks and they cannot get married because Sam has to give most of his money away in alimony. One Friday Marion is trusted to bank $40,000 by her employer. Seeing the opportunity to take the money and start a new life, Marion leaves town and heads towards Sam's California store. Tired after the long drive and caught in a storm, she gets off the main highway and pulls into The Bates Motel. The motel is managed by a quiet young man called Norman who seems to be dominated by his mother.","genre":"Horror","releaseDate":"1960-09-07T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BOWQ0MjRmZmUtY2Q2Yi00ODcxLWE4NGMtMTNjMDY1YmUzMjVkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d4efb485729ea73913e","created":"2018-02-05T11:17:34.736Z","updated":"2018-02-05T11:17:34.736Z","title":"The Godfather: Part II","description":"The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba.","genre":"Crime","releaseDate":"1975-01-01T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjZiNzIxNTQtNDc5Zi00YWY1LThkMTctMDgzYjY4YjI1YmQyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR3,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d5afb485729ea73913f","created":"2018-02-05T11:17:46.527Z","updated":"2018-02-05T11:17:46.527Z","title":"On the Waterfront","description":"Terry Malloy dreams about being a prize fighter, while tending his pigeons and running errands at the docks for Johnny Friendly, the corrupt boss of the dockers union. Terry witnesses a murder by two of Johnny's thugs, and later meets the dead man's sister and feels responsible for his death. She introduces him to Father Barry, who tries to force him to provide information for the courts that will smash the dock racketeers.","genre":"Crime","releaseDate":"1954-11-03T13:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BY2I0MWFiZDMtNWQyYy00Njk5LTk3MDktZjZjNTNmZmVkYjkxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0},
      {"_id":"5a783d6bfb485729ea739140","created":"2018-02-05T11:18:03.064Z","updated":"2018-02-05T11:18:03.064Z","title":"Sunset Boulevard","description":"In Hollywood of the 50's, the obscure screenplay writer Joe Gillis is not able to sell his work to the studios, is full of debts and is thinking in returning to his hometown to work in an office. While trying to escape from his creditors, he has a flat tire and parks his car in a decadent mansion in Sunset Boulevard. He meets the owner and former silent-movie star Norma Desmond, who lives alone with her butler and driver Max Von Mayerling. Norma is demented and believes she will return to the cinema industry, and is protected and isolated from the world by Max, who was her director and husband in the past and still loves her. Norma proposes Joe to move to the mansion and help her in writing a screenplay for her comeback to the cinema, and the small-time writer becomes her lover and gigolo. When Joe falls in love for the young aspirant writer Betty Schaefer, Norma becomes jealous and completely insane and her madness leads to a tragic end. ","genre":"Drama","releaseDate":"1950-09-28T14:00:00.000Z","thumbnail":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU0NTkyNzYwMF5BMl5BanBnXkFtZTgwMDU0NDk5MTI@._V1_UX182_CR0,0,182,268_AL_.jpg","__v":0}
    ]
  },
  {
    'model': 'IndividualRating',
    'documents': [
      {"_id":"5a783eeffb485729ea739144","created":"2018-02-05T11:24:31.437Z","updated":"2018-02-05T11:24:32.067Z","contentId":"5a783b8cfb485729ea739131","userId":"5a783a21fb485729ea739130","stars":3,"__v":0},
      {"_id":"5a783f2efb485729ea739147","created":"2018-02-05T11:25:34.011Z","updated":"2018-02-05T11:25:34.626Z","contentId":"5a783b8cfb485729ea739131","userId":"5a783db9fb485729ea739141","stars":3,"__v":0},
      {"_id":"5a783f37fb485729ea739148","created":"2018-02-05T11:25:43.432Z","updated":"2018-02-05T11:25:43.962Z","contentId":"5a783b8cfb485729ea739131","userId":"5a783e2cfb485729ea739142","stars":5,"__v":0},
      {"_id":"5a783f44fb485729ea739149","created":"2018-02-05T11:25:56.600Z","updated":"2018-02-05T11:25:57.563Z","contentId":"5a783b8cfb485729ea739131","userId":"5a783e4cfb485729ea739143","stars":1,"__v":0},
      {"_id":"5a7842733f28da2da5ad0587","created":"2018-02-05T11:39:31.957Z","updated":"2018-02-05T11:39:32.470Z","contentId":"5a783c22fb485729ea739132","userId":"5a783e4cfb485729ea739143","stars":5,"__v":0},
      {"_id":"5a78427a3f28da2da5ad0589","created":"2018-02-05T11:39:38.931Z","updated":"2018-02-05T11:39:39.536Z","contentId":"5a783c22fb485729ea739132","userId":"5a783e2cfb485729ea739142","stars":5,"__v":0},
      {"_id":"5a7842803f28da2da5ad058a","created":"2018-02-05T11:39:44.450Z","updated":"2018-02-05T11:39:44.969Z","contentId":"5a783c22fb485729ea739132","userId":"5a783db9fb485729ea739141","stars":5,"__v":0},
      {"_id":"5a7842883f28da2da5ad058b","created":"2018-02-05T11:39:52.439Z","updated":"2018-02-05T11:39:53.157Z","contentId":"5a783c22fb485729ea739132","userId":"5a783a21fb485729ea739130","stars":4,"__v":0},
      {"_id":"5a78429b3f28da2da5ad058c","created":"2018-02-05T11:40:11.381Z","updated":"2018-02-05T11:40:11.857Z","contentId":"5a783c5cfb485729ea739134","userId":"5a783a21fb485729ea739130","stars":3,"__v":0},
      {"_id":"5a7842a23f28da2da5ad058e","created":"2018-02-05T11:40:18.551Z","updated":"2018-02-05T11:40:19.264Z","contentId":"5a783c5cfb485729ea739134","userId":"5a783db9fb485729ea739141","stars":3,"__v":0},
      {"_id":"5a7842a93f28da2da5ad058f","created":"2018-02-05T11:40:25.205Z","updated":"2018-02-05T11:40:25.738Z","contentId":"5a783c5cfb485729ea739134","userId":"5a783e2cfb485729ea739142","stars":4,"__v":0},
      {"_id":"5a7842af3f28da2da5ad0590","created":"2018-02-05T11:40:31.775Z","updated":"2018-02-05T11:40:32.375Z","contentId":"5a783c5cfb485729ea739134","userId":"5a783e4cfb485729ea739143","stars":5,"__v":0},
      {"_id":"5a7842c23f28da2da5ad0591","created":"2018-02-05T11:40:50.703Z","updated":"2018-02-05T11:40:52.121Z","contentId":"5a783cb1fb485729ea739136","userId":"5a783e4cfb485729ea739143","stars":5,"__v":0},
      {"_id":"5a7842c83f28da2da5ad0593","created":"2018-02-05T11:40:56.899Z","updated":"2018-02-05T11:40:58.818Z","contentId":"5a783cb1fb485729ea739136","userId":"5a783e2cfb485729ea739142","stars":5,"__v":0},
      {"_id":"5a7842cf3f28da2da5ad0594","created":"2018-02-05T11:41:03.709Z","updated":"2018-02-05T11:41:04.324Z","contentId":"5a783cb1fb485729ea739136","userId":"5a783db9fb485729ea739141","stars":4,"__v":0},
      {"_id":"5a7842dc3f28da2da5ad0596","created":"2018-02-05T11:41:16.828Z","updated":"2018-02-05T11:41:17.429Z","contentId":"5a783cb1fb485729ea739136","userId":"5a783a21fb485729ea739130","stars":4,"__v":0},
      {"_id":"5a7d6db20ad84f550fbd3a00","created":"2018-02-09T09:45:22.829Z","updated":"2018-02-09T09:45:23.645Z","contentId":"5a783ce7fb485729ea739138","userId":"5a783e2cfb485729ea739142","stars":5,"__v":0},
      {"_id":"5a7d7616288a4466058bcf7c","created":"2018-02-09T10:21:10.516Z","updated":"2018-02-09T10:21:11.104Z","contentId":"5a783d2cfb485729ea73913c","userId":"5a783e2cfb485729ea739142","stars":3,"__v":0},
      {"_id":"5a8164dbbc9521766e2f650a","created":"2018-02-12T09:56:43.656Z","updated":"2018-02-12T09:56:44.476Z","contentId":"5a783c97fb485729ea739135","userId":"5a815cd002d2933f7c889402","stars":5,"__v":0},
      {"_id":"5a81664dbc9521766e2f650c","created":"2018-02-12T10:02:53.935Z","updated":"2018-02-12T10:02:54.959Z","contentId":"5a783d1cfb485729ea73913b","userId":"5a815cd002d2933f7c889402","stars":4,"__v":0},
      {"_id":"5a82291004e41b7919be3327","created":"2018-02-12T23:53:52.953Z","updated":"2018-02-12T23:53:53.519Z","contentId":"5a783b8cfb485729ea739131","userId":"5a815cd002d2933f7c889402","stars":5,"__v":0},
      {"_id":"5a82c9d776ee7f268e16531c","created":"2018-02-13T11:19:51.230Z","updated":"2018-02-13T11:19:51.770Z","contentId":"5a82c425ef016cb3690688d3","userId":"5a82c9c676ee7f268e16531b","stars":4,"__v":0},
      {"_id":"5a82cb5776ee7f268e16531e","created":"2018-02-13T11:26:15.942Z","updated":"2018-02-13T11:26:16.424Z","contentId":"5a82c425ef016cb3690688d3","userId":"5a783a21fb485729ea739130","stars":3,"__v":0},
      {"_id":"5a82de62e82da312def865ad","created":"2018-02-13T12:47:30.627Z","updated":"2018-02-13T12:47:31.368Z","contentId":"5a783b8cfb485729ea739131","userId":"5a82de54e82da312def865ac","stars":4,"__v":0},
      {"_id":"5a82de76e82da312def865ae","created":"2018-02-13T12:47:50.159Z","updated":"2018-02-13T12:47:50.653Z","contentId":"5a783c5cfb485729ea739134","userId":"5a82de54e82da312def865ac","stars":3,"__v":0},
      {"_id":"5a82deffe82da312def865b0","created":"2018-02-13T12:50:07.941Z","updated":"2018-02-13T12:50:08.753Z","contentId":"5a82def1e82da312def865af","userId":"5a783a21fb485729ea739130","stars":4,"__v":0}
    ]
  },
  {
    'model': 'AllRating',
    'documents': [
      {"_id":"5a783ef0fb485729ea739145","oneStarCount":1,"twoStarsCount":0,"threeStarsCount":2,"fourStarsCount":1,"fiveStarsCount":2,"totalStarsCount":6,"created":"2018-02-05T11:24:32.680Z","updated":"2018-02-05T11:24:32.680Z","contentId":"5a783b8cfb485729ea739131","average":3.5,"__v":0},
      {"_id":"5a7842743f28da2da5ad0588","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":0,"fourStarsCount":1,"fiveStarsCount":3,"totalStarsCount":4,"created":"2018-02-05T11:39:32.967Z","updated":"2018-02-05T11:39:32.967Z","contentId":"5a783c22fb485729ea739132","average":4.8,"__v":0},
      {"_id":"5a78429c3f28da2da5ad058d","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":3,"fourStarsCount":1,"fiveStarsCount":1,"totalStarsCount":5,"created":"2018-02-05T11:40:12.507Z","updated":"2018-02-05T11:40:12.507Z","contentId":"5a783c5cfb485729ea739134","average":3.6,"__v":0},
      {"_id":"5a7842c53f28da2da5ad0592","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":0,"fourStarsCount":2,"fiveStarsCount":2,"totalStarsCount":4,"created":"2018-02-05T11:40:53.581Z","updated":"2018-02-05T11:40:53.581Z","contentId":"5a783cb1fb485729ea739136","average":4.5,"__v":0},
      {"_id":"5a7d6db40ad84f550fbd3a01","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":0,"fourStarsCount":0,"fiveStarsCount":1,"totalStarsCount":1,"created":"2018-02-09T09:45:24.611Z","updated":"2018-02-09T09:45:24.611Z","contentId":"5a783ce7fb485729ea739138","average":5,"__v":0},
      {"_id":"5a7d7617288a4466058bcf7d","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":1,"fourStarsCount":0,"fiveStarsCount":0,"totalStarsCount":1,"created":"2018-02-09T10:21:11.851Z","updated":"2018-02-09T10:21:11.851Z","contentId":"5a783d2cfb485729ea73913c","average":3,"__v":0},
      {"_id":"5a8164ddbc9521766e2f650b","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":0,"fourStarsCount":0,"fiveStarsCount":1,"totalStarsCount":1,"created":"2018-02-12T09:56:45.345Z","updated":"2018-02-12T09:56:45.345Z","contentId":"5a783c97fb485729ea739135","average":5,"__v":0},
      {"_id":"5a81664fbc9521766e2f650d","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":0,"fourStarsCount":1,"fiveStarsCount":0,"totalStarsCount":1,"created":"2018-02-12T10:02:55.665Z","updated":"2018-02-12T10:02:55.665Z","contentId":"5a783d1cfb485729ea73913b","average":4,"__v":0},
      {"_id":"5a82c9d876ee7f268e16531d","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":1,"fourStarsCount":1,"fiveStarsCount":0,"totalStarsCount":2,"created":"2018-02-13T11:19:52.308Z","updated":"2018-02-13T11:19:52.308Z","contentId":"5a82c425ef016cb3690688d3","average":3.5,"__v":0},
      {"_id":"5a82df01e82da312def865b1","oneStarCount":0,"twoStarsCount":0,"threeStarsCount":0,"fourStarsCount":1,"fiveStarsCount":0,"totalStarsCount":1,"created":"2018-02-13T12:50:09.526Z","updated":"2018-02-13T12:50:09.526Z","contentId":"5a82def1e82da312def865af","average":4,"__v":0}
    ]
  }
];

module.exports = seedData;