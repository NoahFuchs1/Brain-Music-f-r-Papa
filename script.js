// Datenstrukturen
let playlists = [];
let selectedSongs = [];
let currentPlaylist = null;
let timerInterval = null;
let currentSongIndex = 0;
let totalSeconds = 0; // Variable für die Gesamtzeit des Timers
let startTime;

// Elemente
const playlistPage = document.getElementById('playlistPage');
const libraryPage = document.getElementById('libraryPage');
const playlistDetailPage = document.getElementById('playlistDetailPage');
const playlistContainer = document.getElementById('playlistContainer');
const musicLibrary = document.getElementById('musicLibrary');
const playlistTitle = document.getElementById('playlistTitle');
const timer = document.getElementById('timer');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

// Musikdateien
const songs = [
    { id: 1, name: 'Active Galaxy', src: 'https://www.dropbox.com/scl/fi/oniovbl2uyd9pxm6a4z84/Active-Galaxy-Chris-Electronic-Session8_1.8_Nrmlzd2-1_VBR5.mp3?rlkey=gyohp16j4x3m9v8bsoy29wbun&st=tnlkmhky&raw=1' },
    { id: 2, name: 'Active Matrix', src: 'https://www.dropbox.com/scl/fi/yyqpbsx53d4ptr4i3wcia/Active-Matrix.mp3?rlkey=cvmfd7zw6ak02g46psqkfh61l&st=tnix3do1&raw=1' },
    { id: 3, name: 'All Day', src: 'https://www.dropbox.com/scl/fi/0ro7idg1ifjnovliafy98/All-Day-Chris-Electronic-Session1_1.2_Nrmlzd2-1_VBR5.mp3?rlkey=bf9qbcjzz8iz7wtc4f7xbrw7v&st=8a9jlrme&raw=1' },
    { id: 4, name: 'All Systems', src: 'https://www.dropbox.com/scl/fi/deuvsnbigmtyg6ngwgee2/All-Systems-Go-ChrisCinematicRealityHackersSession3_1.8_Nrmlzd2_VBR5.mp3?rlkey=75cqwzptgaf6ipegd6e088pb7&st=zvazitzp&raw=1' },
    { id: 5, name: 'Allin Focus', src: 'https://www.dropbox.com/scl/fi/j4606gq4j0pr87d8kwg9g/AllIn_Focus_DeepWork_Lofi_30_90bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=luqereax6yf9bu3v2wprgi5h9&st=a5cfrqdr&raw=1' },
    { id: 7, name: 'Aqua Focus', src: 'https://www.dropbox.com/scl/fi/7mz3lcawnc44abfjlqeai/Aqua_Focus_Deep_Work_Grooves_30_95bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=b0e0phdwriofzt45p0xf3q46m&st=a9sj61ja&raw=1' },
    { id: 6, name: 'Becoming Whole', src: 'https://www.dropbox.com/scl/fi/p7nbjk7yu7p3h3hyt89yt/BecomingWhole_Focus_DeepWork_LoFi_30_83bpm_Nrmlzd2_VBR5.mp3?rlkey=wuqrapjdmdar7phaojjsrrto8&st=gbeifqtr&raw=1' },
    { id: 8, name: 'Below the Ocean', src: 'https://www.dropbox.com/scl/fi/jj5cdwvf3qsndqfvv037v/Below-the-Ocean-Deep-Work-Lofi-Focus-Chris-Session-3-90bpm_VBR5.mp3?rlkey=x51318db51itlsa0ykl4e0evu&st=s1xhw320&raw=1' },
    { id: 9, name: 'Bridges', src: 'https://www.dropbox.com/scl/fi/74ahdy6reqxk64ojvkf1u/Bridges_Focus_DeepWork_Grooves_30_110bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=8e2p2umvmushn6fybzadjvgs2&st=dyeg1sbt&raw=1' },
    { id: 10, name: 'Bright', src: 'https://www.dropbox.com/scl/fi/t4uehwt1mcpkxmzsjdshz/Bright-Groove-Chris-Hip-Hop-Session-9_1.4_Nrmlzd2_VBR5.mp3?rlkey=24anl1o9z4tr2ufa3eficlx9z&st=020yadv3&raw=1' },
    { id: 11, name: 'Circadian Balance', src: 'https://www.dropbox.com/scl/fi/7kuwfrax3kq63xs1e4ii4/CircadianBalance_Focus_DeepWork_Lofi_30_80bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=7nc5t02yx8jbsdmqz5az8bqh4&st=st2cy6ce&raw=1' },
    { id: 12, name: 'Cloud Machine', src: 'https://www.dropbox.com/scl/fi/p5spfcp2gxiohh4telrm7/CloudMachine_Focus_DeepWork_Grooves_30_120bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=yydkivatux2n18ihv0ifk5b2e&st=y2llx18r&raw=1' },
    { id: 13, name: 'Common Ground', src: 'https://www.dropbox.com/scl/fi/r04tv0ihhv2vu3hbfdkl8/Common-Groud-Chris-Hip-Hop-Session-8_1.5_Nrmlzd2_VBR5.mp3?rlkey=z6g6rgi2qb7by06hrk26f4km8&st=gg38p8gp&raw=1' },
    { id: 14, name: 'Crossroads', src: 'https://www.dropbox.com/scl/fi/kpq40o7e5uufg47sig2wm/Crossroads-Lo-Fi-Deep-Work-Focus-Conor-90bpm_1.1_Nrmlzd2_VBR5.mp3?rlkey=3boffkpzgws0qftwsxeobzh08&st=adyb76pj&raw=1' },
    { id: 15, name: 'Cruising Altitude', src: 'https://www.dropbox.com/scl/fi/rfrid69gvh1nngugicwnt/Cruising-Altitude.mp3?rlkey=e4rrngohoxbieddou24tmkr9e&st=z50zeo6d&raw=1' },
    { id: 16, name: 'Day Dreams', src: 'https://www.dropbox.com/scl/fi/u0fmnji0rsyx73ot4053a/Day-Dreams-LoFi-Deep-Work-Focus-Conor-85bpm_Nrmlzd2_VBR5.mp3?rlkey=u1jz6ff0dz0djhkvnm09zocbx&st=9gqzbs1q&raw=1' },
    { id: 17, name: 'Days Ahead', src: 'https://www.dropbox.com/scl/fi/alkqt2nbfdvtyzt3nvrqw/Days-Ahead-Grooves-Focus-Deep-Work-Conor-90bpm_1.8_Nrmlzd2_VBR5.mp3?rlkey=sdlghc7sxtudj11wqvdn3u0ui&st=trkcpt8r&raw=1' },
    { id: 18, name: 'Detroit Love', src: 'https://www.dropbox.com/scl/fi/i44m22bys442sm9ui48zi/DetroitLove_Focus_DeepWork_Techno_30_114BPM_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=n7we32p7hv7mv464rf9z8dnjd&st=zwrpfl1q&raw=1' },
    { id: 19, name: 'Down Low', src: 'https://www.dropbox.com/scl/fi/8i0gxbtuagtiakihdxma1/Down-Low-Deep-Work-Lofi-Focus-Chris-Session-5-90bpm_VBR5.mp3?rlkey=bdbdchuzqe3wv4ztk4dxinjup&st=iri64qyl&raw=1' },
    { id: 20, name: 'Dust Bowl', src: 'https://www.dropbox.com/scl/fi/wbixjn09y2leo9n6t2n26/Dust-Bowl-Deep-Work-Electronic-Conor-125bpm_1.2_Nrmlzd2_VBR5.mp3?rlkey=ef7ke7iomk69o0iihjp28969b&st=m7q17x15&raw=1' },
    { id: 21, name: 'Easy Breezy', src: 'https://www.dropbox.com/scl/fi/hsxac8x2g353usb8ppb0f/EasyBreezy_Focus_DeepWork_LoFi_30_85bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=cxhg2acsa8aybgz9csdkcfnb8&st=1mtx0q00&raw=1' },
    { id: 22, name: 'Ellipsis', src: 'https://www.dropbox.com/scl/fi/ihdkxmodxiczvi6vv1iod/Ellipsis-Lo-Fi-Deep-Work-Focus-Conor-90bpm_1.7_Nrmlzd2_VBR5.mp3?rlkey=d0nh7q39oajf6qv07rnj2ku7w&st=d1ce57x0&raw=1' },
    { id: 23, name: 'Empty Rooms', src: 'https://www.dropbox.com/scl/fi/hztefb06ddqc5f4izbiil/Empty-Rooms-Grooves-Focus-Deep-Work-Conor-120bpm_Nrmlzd2_VBR5.mp3?rlkey=kujci1lmedrjkr4udt6zgc1ke&st=rhs6gt89&raw=1' },
    { id: 24, name: 'Evening Lights', src: 'https://www.dropbox.com/scl/fi/g5ele5nyh5657v1bftv2l/EveningLights_Focus_DeepWork_Lofi_30_120bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=t7tenwax7q13b5v86awm26oti&st=ujfyibye&raw=1' },
    { id: 25, name: 'Expressions', src: 'https://www.dropbox.com/scl/fi/vdnq51afthetm4wvo5ori/Expressions_Focus_DeepWork_LoFi_30_90bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=hxgsl3t5nlvvr3i5bqg3cxj7l&st=50ki81eb&raw=1' },
    { id: 26, name: 'Fault Lines', src: 'https://www.dropbox.com/scl/fi/7ghm8h8lub4th7paiz256/Fault-Lines-Grooves-Focus-Deep-Work-Conor-90bpm_1.3_Nrmlzd2_VBR5.mp3?rlkey=6e2p6bu84wnhkke91k321s8m9&st=z3bvxfq3&raw=1' },
    { id: 27, name: 'Following the Energy', src: 'https://www.dropbox.com/scl/fi/igwi00ixym4j00ohux5nd/Following-the-Energy-Chris-Electronic-Focus-Session-13_1.7_Nrmlzd2-1_VBR5.mp3?rlkey=06ehekd73sfwl1wvzi14ua0p4&st=o7mrf7lx&raw=1' },
    { id: 28, name: 'Fortuitous', src: 'https://www.dropbox.com/scl/fi/ce97lcvehaakkk4rwg1p3/Fortuitous_Focus_DeepWork_Grooves_30_120bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=8740etvi78k2iqm02qmtne83n&st=5go4he7a&raw=1' },
    { id: 29, name: 'Foundations', src: 'https://www.dropbox.com/scl/fi/ub4mtjx9qedfvn9ysd2ye/Foundations_Focus_DeepWork_Lofi_30_88bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=jt3h4nfnu6bnw7f51l5p5k1yn&st=7ougvpz5&raw=1' },
    { id: 30, name: 'Freestyle Flow', src: 'https://www.dropbox.com/scl/fi/7hcharlng8rmipv0klgw5/Freestyle-Flow-Chris-Hip-Hop-Session4_1.4_Nrmlzd2_VBR5.mp3?rlkey=a4fwrnfu5vqs3qsn35nt92oy0&st=hro97itt&raw=1' },
    { id: 31, name: 'Geode', src: 'https://www.dropbox.com/scl/fi/l0z67388cd3wqdeiqssa3/Geode-Grooves-Focus-Deep-Work-Conor-100bpm_Nrmlzd2_VBR5.mp3?rlkey=31apfv3oknlm7hojlkjjjwdpg&st=0g5abbty&raw=1' },
    { id: 32, name: 'Gold Ground', src: 'https://www.dropbox.com/scl/fi/ni8308kwibb0a1ipezx2c/Gold-Ground-Grooves-Focus-Deep-Work-Conor-75bpm_Nrmlzd2_VBR5.mp3?rlkey=wznb6zb73br2stvhdia12d526&st=6wisodfw&raw=1' },
    { id: 33, name: 'Gold Coast', src: 'https://www.dropbox.com/scl/fi/1k7a5p3gjke2vfagw9vah/Gold_Coast_Focus_Deep_Work_Grooves_30_100bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=kb4wqwwh3yhm8j7q4njd28cfy&st=eq35ai68&raw=1' },
    { id: 34, name: 'Goodnight Mood', src: 'https://www.dropbox.com/scl/fi/151g4qv1uhbs9bebtrw0i/GoodnightMood_Focus_DeepWork_LoFi_30_84bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=3yjei7myak4ytf7592i1qricu&st=fgwg3fin&raw=1' },
    { id: 35, name: 'Gradual Connection', src: 'https://www.dropbox.com/scl/fi/vd47qpkalukonicznop4k/GradualConnection_Focus_DeepWork_Grooves_30_115bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=f66moz0m3ppw25ce11n2uaedb&st=ehwzczr7&raw=1' },
    { id: 36, name: 'Gravel Road', src: 'https://www.dropbox.com/scl/fi/pjfsjo1lyxio34zkul3w7/Gravel-Road-LoFi-Focus-Deep-Work-Conor-90bpm_Nrmlzd2_VBR5.mp3?rlkey=z4pj2g0wqvjpyx3yd34d0zn8j&st=yp9e0n9y&raw=1' },
    { id: 37, name: 'Hold the Phone', src: 'https://www.dropbox.com/scl/fi/h6v7mc6gn9nsz2qn56tm7/HoldthePhone_Focus_DeepWork_Grooves_30_120bpm_MedNELNrmlzd2_VBR5.mp3?rlkey=nytnd7va8jmy8tbfmmji8kh77&st=cfdqb9n5&raw=1' },
    { id: 38, name: 'Husk', src: 'https://www.dropbox.com/scl/fi/0x85lh42olelab3mmzf6d/Husk-Grooves-Focus-Deep-Work-Conor-95bpm_Nrmlzd2_VBR5.mp3?rlkey=434rj2c6mp4ftdfinultcrtsa&st=tfuont4h&raw=1' },
    { id: 39, name: 'Inner Eye', src: 'https://www.dropbox.com/scl/fi/3sb22atjj4fvcaqocxk5m/Inner-Eye-Deep-Work-Electronic-Conor-125bpm_1.2_Nrmlzd2_VBR5.mp3?rlkey=mn5uw1xg06w7mhs1uqwsv2jg9&st=vicooyhb&raw=1' },
    { id: 40, name: 'Interference', src: 'https://www.dropbox.com/scl/fi/n7w1swig2tnrdngdv9tdf/Interference-Deep-Work-Electronic-Conor-125bpm_1.1_Nrmlzd2_VBR5.mp3?rlkey=obqm8syhy5da2kknp23wih18y&st=xyl9nt69&raw=1' },
    { id: 41, name: 'Krafty', src: 'https://www.dropbox.com/scl/fi/jz7vgxuoc8mhl11h3in2v/Krafty_Focus_Creativity_Electronic_30_120BPM_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=ukrkxe37nlfhweeaiee8fiybb&st=hcn4s160&raw=1' },
    { id: 42, name: 'Kyoto', src: 'https://www.dropbox.com/scl/fi/brbu04byo81ze2umh2o4n/Kyoto_Focus_DeepWork_Grooves_30_115bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=sl5dy54t9o2jcpw5zosng68fl&st=1wvewqut&raw=1' },
    { id: 43, name: 'Lagos', src: 'https://www.dropbox.com/scl/fi/3xzclru64gn8i580nzuzj/Lagos_Focus_DeepWork_Grooves_30_100bpm_LowNELNrmlzd2_VBR5.mp3?rlkey=rw1yg7do3to7xoa8xce1zj2eg&st=ubp1231b&raw=1' },
    { id: 44, name: 'Lantern', src: 'https://www.dropbox.com/scl/fi/zitoh9kr599ixgxz4pi50/Lantern_Focus_DeepWork_LoFi_30_82bpm_Nrmlzd2_VBR5.mp3?rlkey=keirqqcznla8mwzohtowls2tz&st=c099r5cu&raw=1' },
    { id: 45, name: 'Leading Edge', src: 'https://www.dropbox.com/scl/fi/g3cy35lb11eiilyrdf2x4/Leading-Edge.mp3?rlkey=5wy78ov84y6shos6jrx3df6pv&st=yoxmj2wq&raw=1' },
    { id: 46, name: 'Lead the Way', src: 'https://www.dropbox.com/scl/fi/qc2rajox830x4dj3tscpb/LeadtheWay_Focus_DeepWork_Grooves_30_116bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=pw3zp08ygm0ms0ayfnpa5u77m&st=8tn1d95a&raw=1' },
    { id: 47, name: 'Leviathan', src: 'https://www.dropbox.com/scl/fi/cfb5jlqs1ziqvpkyuee9l/Leviathan-Electronic-Focus-Deep-Work-Conor-125bpm_1.2_Nrmlzd2_VBR5.mp3?rlkey=ih0a5uvyr6lnna0vpydqjssf6&st=z39oaclk&raw=1' },
    { id: 48, name: 'Limitless', src: 'https://www.dropbox.com/scl/fi/crrt78exo6k3iqqg5wmj3/Limitless_Focus_DeepWork_Electronic_30_122bpm_Nrmlzd2_VBR5.mp3?rlkey=v7s780hvony4xwpnzz4m6s67z&st=wqydm27n&raw=1' },
    { id: 49, name: 'Low Light', src: 'https://www.dropbox.com/scl/fi/finyju2i01bv19k4jv3ct/Low-Light-Deep-Work-Lofi-Focus-Chris-Session-1-90bpm_VBR5.mp3?rlkey=7tngcn0xsg2jeom40oyk76q80&st=zgq0b27x&raw=1' },
    { id: 50, name: 'Luxet Tenebris', src: 'https://www.dropbox.com/scl/fi/qo4n4c95duhflk6rpju3n/LuxetTenebris_Focus_DeepWork_LoFi_30_80bpm_Nrmlzd2_VBR5.mp3?rlkey=bvxy1xdmw006tl9wkqlqctpqx&st=2lr34dv2&raw=1' },
    { id: 51, name: 'Memento', src: 'https://www.dropbox.com/scl/fi/vwf28i95jifjyhldg5h39/Memento_Focus_DeepWork_LoFi_30_90bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=mydznirq9587wv3vvn0mvqpia&st=ttg4tw7k&raw=1' },
    { id: 52, name: 'Midmorning', src: 'https://www.dropbox.com/scl/fi/yhjokuo974x5q0km6xwwy/Midmorning_Focus_DeepWork_LoFi_30_90bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=i20a4ydawwh1cabrxfvst9itk&st=6nhbq18u&raw=1' },
    { id: 53, name: 'Monologue', src: 'https://www.dropbox.com/scl/fi/rnh2ejnhhg50vj5dznb3q/Monologue_Focus_Deep_Work_Grooves_30_100bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=w98ibnc8cj908qoplfuyh94vp&st=a50p9fkj&raw=1' },
    { id: 54, name: 'Moon Garden', src: 'https://www.dropbox.com/scl/fi/wj9zevhsoeudgj1y17ote/MoonGarden_Focus_DeepWork_Lofi_30_80bpm_Nrmlzd2_VBR5.mp3?rlkey=k4j9x1thxz6nbugtp4rcf6so5&st=t7xkxepo&raw=1' },
    { id: 55, name: 'Natural Habit', src: 'https://www.dropbox.com/scl/fi/dj7h1a3jp3iy6oz34p9z4/NaturalHabit_Focus_DeepWork_Lofi_30_86bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=m5oa1ah7irjtbpp003zxzr1or&st=cyzoxfhm&raw=1' },
    { id: 56, name: 'Nightshift', src: 'https://www.dropbox.com/scl/fi/igolg68oqqye1jux98gun/Nightshift_Focus_DeepWork_Grooves_30_110bpm_LowNELNrmlzd2_VBR5.mp3?rlkey=8ltx5jm4ufozl9ba1rouoykeo&st=ya9msn3i&raw=1' },
    { id: 57, name: 'Paralles', src: 'https://www.dropbox.com/scl/fi/ds5rrra6pg6dzu1pxkgv1/Parallels_Focus_DeepWork_LoFi_30_90bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=7r8fw1ubeuseoge65kjhb2wek&st=mjiqgilm&raw=1' },
    { id: 58, name: 'Parasympathetic', src: 'https://www.dropbox.com/scl/fi/jy3k0bfbuh2s3rovs8kzw/Parasympathetic_Focus_DeepWork_LoFi_30_90bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=8tszohbg7ssjcir0dffm504lm&st=cso2g7ye&raw=1' },
    { id: 59, name: 'Perfect Sights', src: 'https://www.dropbox.com/scl/fi/859xy7uasg7owtaz61bbn/Perfect-Sights.mp3?rlkey=ryfd296bwg4hxg94avrzbhqr7&st=66sdrrlx&raw=1' },
    { id: 60, name: 'Peridot', src: 'https://www.dropbox.com/scl/fi/n18lthu20jqfjl3x46glc/Peridot_Focus_DeepWork_LoFi_30_90bpm_Nrmlzd2_VBR5.mp3?rlkey=k0mgni3c9bhtagjaa6fod7dgp&st=lncv702f&raw=1' },
    { id: 61, name: 'Prisms', src: 'https://www.dropbox.com/scl/fi/dkbpgfwgtup389onoiafr/Prisms_Focus_DeepWork_LoFi_30_84bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=qoh5mfih5dk9ei6jo4gojqeqg&st=t5c2cira&raw=1' },
    { id: 62, name: 'Returning Purpose', src: 'https://www.dropbox.com/scl/fi/uaaomus7i1bfmlyr42wkz/ReturningPurpose_Focus_DeepWork_Grooves_30_114bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=bbay3daoq1h7o6e3y3hmxzva1&st=o1qkqkc8&raw=1' },
    { id: 63, name: 'Sacred Woods', src: 'https://www.dropbox.com/scl/fi/wwq0dz0rjtygg73px346y/SacredWoods_Focus_DeepWork_Lofi_30_86bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=jjojtbrrwl2pt439qmcl9obz8&st=dfj0nq7p&raw=1' },
    { id: 64, name: 'Scattered Shapes', src: 'https://www.dropbox.com/scl/fi/d3j3f3t7avx43g31kupcg/ScatteredShapes_Focus_DeepWork_LoFi_30_85bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=srx9vzsu6hdeohsriaad6a2zc&st=45mn7swk&raw=1' },
    { id: 65, name: 'Shifting Paradigms', src: 'https://www.dropbox.com/scl/fi/7pzojja740emo93wh76dn/Shifting-Paradigms.mp3?rlkey=nk88ov36uwsh7m6bgbsfzil7h&st=sxf5eett&raw=1' },
    { id: 66, name: 'Ships in the Night', src: 'https://www.dropbox.com/scl/fi/hhbjwka8k0xgw1f5m4pky/Ships-in-the-Night-Deep-Work-Lofi-Focus-Chris-Session-4-90bpm_VBR5.mp3?rlkey=cs3h6urgyynmge3tddxc02dc8&st=oqjrl7mn&raw=1' },
    { id: 67, name: 'Smoke Machine', src: 'https://www.dropbox.com/scl/fi/gfq0ytkn2p3eg17r5omsj/SmokeMachine_Focus_DeepWork_Electronic_30_130BPM_MidNELNrmlzd2_VBR5.mp3?rlkey=xmp2rt3ty9kiaj9e92zvq6z49&st=yiugfz6d&raw=1' },
    { id: 68, name: 'Snow Day', src: 'https://www.dropbox.com/scl/fi/dy478xvdo11hkvaooo4yh/Snow-Day-LoFi-Deep-Work-Focus-Conor-90bpm_Nrmlzd2_VBR5.mp3?rlkey=117qdk2uq7t4fr6b8i4ux2hut&st=c367xmyl&raw=1' },
    { id: 69, name: 'Soft Storm', src: 'https://www.dropbox.com/scl/fi/k87lw4667wca6dzbsshg2/SoftStorm_Focus_DeepWork_Electronic_30_118BPM_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=rkot3k9pnkgtqu5k3j8fq5oo5&st=gajnmpc7&raw=1' },
    { id: 70, name: 'Spica', src: 'https://www.dropbox.com/scl/fi/wtwko9go3vcor4ok8sp4y/Spica_Focus_DeepWork_LoFi_30_86bpm_Nrmlzd2_VBR5.mp3?rlkey=ndi3sgq6xsijarvd6r1whvf0e&st=dt3ptewq&raw=1' },
    { id: 71, name: 'Spring Step', src: 'https://www.dropbox.com/scl/fi/79d2p3513h2d785px7mw4/SpringStep_Focus_DeepWork_LoFi_30_90bpm_MedNEL_Nrmlzd2_VBR5.mp3?rlkey=i9dekpddittaxk6zared3zpnf&st=nlmucgif&raw=1' },
    { id: 72, name: 'Square One', src: 'https://www.dropbox.com/scl/fi/05xkrvpiino4h2h59z8qc/SquareOne_Focus_DeepWork_LoFi_30_80bpm_Nrmlzd2_VBR5.mp3?rlkey=nn9uv5265fwvbk39u5d8cscul&st=twd407sr&raw=1' },
    { id: 73, name: 'Starseed', src: 'https://www.dropbox.com/scl/fi/6hrujc6i15gjidzbxwrqu/Starseed_Focus_DeepWork_LoFi_30_80bpm_Nrmlzd2_VBR5.mp3?rlkey=cuxck4tob3gjrvc7b46xwud2a&st=bpotbagg&raw=1' },
    { id: 74, name: 'Steady State', src: 'https://www.dropbox.com/scl/fi/9r8w100ri5cegps35o1l7/SteadyState_Focus_DeepWork_Grooves_30_100bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=200hhq6njy7nslh6p90kxu52j&st=kqyi89bz&raw=1' },
    { id: 75, name: 'Substance', src: 'https://www.dropbox.com/scl/fi/rewobwzy5t4e8y8a1ppkv/Substance-Chris-Electronic-Focus-Session-16_1.4_Nrmlzd2_VBR5.mp3?rlkey=8dssr2upxzk9vwfgn75ds9eh4&st=s9yhsbwf&raw=1' },
    { id: 76, name: 'Sunken Moon', src: 'https://www.dropbox.com/scl/fi/rw7pmxtninfyhwws2e4uj/Sunken-Moon-Grooves-Focus-Deep-Work-Conor-122bpm_Nrmlzd2_VBR5.mp3?rlkey=svumvj7ld1fksh35goq4no9j6&st=nl2u7o69&raw=1' },
    { id: 77, name: 'Supernova', src: 'https://www.dropbox.com/scl/fi/zu7qautj1vzsrf1s1rh3a/Supernova.mp3?rlkey=i3jt66ctp8zgi8s68vp5alkqs&st=mjmu0913&raw=1' },
    { id: 78, name: 'Switched On', src: 'https://www.dropbox.com/scl/fi/nhff1fe7ihni8ckq5wr89/SwitchedOn_Focus_DeepWork_LoFi_30_85bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=ve3aw8alarlnvl4ccto04gwab&st=n1s23spa&raw=1' },
    { id: 79, name: 'Touchstone', src: 'https://www.dropbox.com/scl/fi/jc7ad8fog5bc0ubim5ukk/Touchstone_Focus_DeepWork_LoFi_30_90bpm_LowNEL_Nrmlzd2_VBR5.mp3?rlkey=vlj7shoz0vl2ebikul4t3qkf3&st=o21z0cqi&raw=1' },

];

// Startseite anzeigen
playlistPage.classList.add('active');


// Funktion zum Speichern der Playlists im Local Storage
function savePlaylists() {
    localStorage.setItem('musicAppPlaylists', JSON.stringify(playlists));
}

function loadPlaylists() {
    const savedPlaylists = localStorage.getItem('musicAppPlaylists');
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
    }
    playlistContainer.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${playlist.name}</span>
            <div>
                <button class="edit-btn">
                    <img class="optionIcon" src="edit.png">
                </button>
                <button class="delete-btn">
                    <img class="optionIcon" src="delete.png">
                </button>
            </div>
        `;
        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editPlaylist(index);
        });
        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deletePlaylist(index);
        });
        li.addEventListener('click', () => openPlaylist(index));
        playlistContainer.appendChild(li);
    });
}

// Playlist bearbeiten
function editPlaylist(index) {
    const newName = prompt('Neuer Name der Playlist:', playlists[index].name);
    if (newName) {
        playlists[index].name = newName;
        savePlaylists(); // Speichern nach dem Bearbeiten
        loadPlaylists();
    }
}

// Playlist löschen
function deletePlaylist(index) {
    if (confirm('Möchtest du diese Playlist wirklich löschen?')) {
        playlists.splice(index, 1);
        savePlaylists(); // Speichern nach dem Löschen
        loadPlaylists();
    }
}

// Musikbibliothek anzeigen
function loadMusicLibrary() {
    musicLibrary.innerHTML = '';
    songs.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        li.innerHTML = `
            <span>${song.name}</span>
            <span class="checkmark hidden">✔</span>
        `;
        li.addEventListener('click', () => toggleSongSelection(song, li));
        musicLibrary.appendChild(li);
    });
}

// Song auswählen oder abwählen
function toggleSongSelection(song, element) {
    if (selectedSongs.includes(song)) {
        selectedSongs = selectedSongs.filter(s => s !== song);
        element.classList.remove('selected');
        element.querySelector('.checkmark').classList.add('hidden');
    } else {
        selectedSongs.push(song);
        element.classList.add('selected');
        element.querySelector('.checkmark').classList.remove('hidden');
    }
}

// Neue Playlist erstellen
document.getElementById('addPlaylistBtn').addEventListener('click', () => {
    selectedSongs = [];
    libraryPage.classList.add('active');
    playlistPage.classList.remove('active');
    loadMusicLibrary();
});

document.getElementById('addSongsBtn').addEventListener('click', () => {
    const playlistName = prompt('Name der Playlist:');
    if (playlistName) {
        playlists.push({ name: playlistName, songs: selectedSongs });
        savePlaylists(); // Speichern nach dem Hinzufügen
        libraryPage.classList.remove('active');
        playlistPage.classList.add('active');
        loadPlaylists();
    }
});

// Playlist öffnen
function openPlaylist(index) {
    currentPlaylist = playlists[index];
    currentSongIndex = 0;
    playlistTitle.innerText = currentPlaylist.name;
    playlistDetailPage.classList.add('active');
    playlistPage.classList.remove('active');
    startPlaylist();
}

// Playlist starten
function startPlaylist() {
    audioSource.src = currentPlaylist.songs[currentSongIndex].src;
    audioPlayer.load();
    audioPlayer.play(); // Musik abspielen
}

function startTimer() {
    startTime = Date.now() - (totalSeconds * 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timer.innerText = `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Event-Listener für den Audio-Player
audioPlayer.addEventListener('play', () => {
    if (timerInterval === null) {
        startTimer();
    }
});

audioPlayer.addEventListener('pause', stopTimer);

audioPlayer.addEventListener('ended', () => {
    stopTimer();
    if (currentSongIndex < currentPlaylist.songs.length - 1) {
        currentSongIndex++;
        startPlaylist();
    } else {
        totalSeconds = 0;
        startTime = null;
    }
});

// Vorheriges Lied
document.getElementById('prevSongBtn').addEventListener('click', () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        startPlaylist();
    }
});

// Nächstes Lied
document.getElementById('nextSongBtn').addEventListener('click', () => {
    if (currentSongIndex < currentPlaylist.songs.length - 1) {
        currentSongIndex++;
        startPlaylist();
    }
});

// Zurück zur Startseite
document.getElementById('backToPlaylists').addEventListener('click', () => {
    libraryPage.classList.remove('active');
    playlistPage.classList.add('active');
});

document.getElementById('backToPlaylistsDetail').addEventListener('click', () => {
    playlistDetailPage.classList.remove('active');
    playlistPage.classList.add('active');
    stopTimer();
    totalSeconds = 0;
});


// Songtitel-Element
const currentSongTitle = document.getElementById('currentSongTitle');

// Playlist starten
function startPlaylist() {
    audioSource.src = currentPlaylist.songs[currentSongIndex].src;
    currentSongTitle.innerText = currentPlaylist.songs[currentSongIndex].name; // Songname setzen
    audioPlayer.load();
    audioPlayer.play(); // Musik abspielen
}



//hier war der code



// Laden der Playlists beim Start der App
document.addEventListener('DOMContentLoaded', () => {
    loadPlaylists();
});