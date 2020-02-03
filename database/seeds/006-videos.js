
exports.seed = function (knex) {
    return knex('videos')
        .then(function () {
            return knex('videos').insert(
                [{
                    "owner_id": 14,
                    "description": "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.",
                    "created_at": "2019-04-12 17:15:53",
                    "updated_at": "2019-11-27 19:59:29",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 1
                  }, {
                    "owner_id": 59,
                    "description": "In blandit ultrices enim.",
                    "created_at": "2019-02-25 23:53:39",
                    "updated_at": "2019-05-20 02:45:53",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 10
                  }, {
                    "owner_id": 14,
                    "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
                    "created_at": "2019-08-24 01:56:17",
                    "updated_at": "2019-02-11 19:52:56",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 17
                  }, {
                    "owner_id": 59,
                    "description": "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
                    "created_at": "2019-04-20 06:43:20",
                    "updated_at": "2019-02-17 02:29:34",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 21
                  }, {
                    "owner_id": 66,
                    "description": "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
                    "created_at": "2019-04-19 10:26:13",
                    "updated_at": "2019-03-31 12:00:33",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 22
                  }, {
                    "owner_id": 38,
                    "description": "Integer ac neque. Duis bibendum.",
                    "created_at": "2019-10-06 00:28:46",
                    "updated_at": "2019-06-28 10:28:27",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 18
                  }, {
                    "owner_id": 67,
                    "description": "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
                    "created_at": "2019-12-17 03:10:38",
                    "updated_at": "2019-02-08 09:04:09",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 8
                  }, {
                    "owner_id": 8,
                    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
                    "created_at": "2019-02-06 22:05:55",
                    "updated_at": "2019-08-28 13:35:32",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 21
                  }, {
                    "owner_id": 95,
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    "created_at": "2020-02-02 16:07:10",
                    "updated_at": "2019-03-11 14:48:56",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 2
                  }, {
                    "owner_id": 68,
                    "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
                    "created_at": "2019-03-21 21:07:17",
                    "updated_at": "2019-02-21 14:39:59",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 9
                  }, {
                    "owner_id": 9,
                    "description": "Nulla nisl. Nunc nisl.",
                    "created_at": "2019-04-05 20:42:38",
                    "updated_at": "2019-11-15 09:05:11",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 10
                  }, {
                    "owner_id": 53,
                    "description": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
                    "created_at": "2019-12-29 11:27:03",
                    "updated_at": "2019-09-17 11:17:55",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 19
                  }, {
                    "owner_id": 2,
                    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
                    "created_at": "2019-11-24 05:22:03",
                    "updated_at": "2020-01-20 18:24:02",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 10
                  }, {
                    "owner_id": 31,
                    "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                    "created_at": "2020-01-11 06:45:06",
                    "updated_at": "2019-11-25 04:43:56",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 4
                  }, {
                    "owner_id": 4,
                    "description": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
                    "created_at": "2019-12-04 01:06:43",
                    "updated_at": "2019-09-01 19:56:45",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 4
                  }, {
                    "owner_id": 20,
                    "description": "Quisque id justo sit amet sapien dignissim vestibulum.",
                    "created_at": "2019-09-25 03:28:43",
                    "updated_at": "2019-09-28 21:16:02",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 5
                  }, {
                    "owner_id": 61,
                    "description": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
                    "created_at": "2019-04-03 13:36:39",
                    "updated_at": "2019-02-13 12:45:26",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 21
                  }, {
                    "owner_id": 86,
                    "description": "Ut at dolor quis odio consequat varius.",
                    "created_at": "2019-05-02 04:43:59",
                    "updated_at": "2019-08-07 03:36:25",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 11
                  }, {
                    "owner_id": 93,
                    "description": "Donec dapibus.",
                    "created_at": "2020-01-19 15:26:02",
                    "updated_at": "2019-07-02 08:30:19",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 11
                  }, {
                    "owner_id": 27,
                    "description": "Donec semper sapien a libero. Nam dui.",
                    "created_at": "2019-12-19 10:20:20",
                    "updated_at": "2019-10-11 03:04:23",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 8
                  }, {
                    "owner_id": 35,
                    "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius.",
                    "created_at": "2019-10-15 13:21:00",
                    "updated_at": "2019-08-04 07:24:25",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 6
                  }, {
                    "owner_id": 4,
                    "description": "Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
                    "created_at": "2019-10-27 13:52:50",
                    "updated_at": "2019-04-09 17:05:42",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 16
                  }, {
                    "owner_id": 2,
                    "description": "Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
                    "created_at": "2019-07-20 23:30:02",
                    "updated_at": "2019-03-03 04:54:22",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 15
                  }, {
                    "owner_id": 25,
                    "description": "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.",
                    "created_at": "2019-09-18 01:04:33",
                    "updated_at": "2019-08-22 17:03:42",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 13
                  }, {
                    "owner_id": 82,
                    "description": "Duis mattis egestas metus. Aenean fermentum.",
                    "created_at": "2019-07-16 13:32:39",
                    "updated_at": "2019-07-26 20:47:01",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 8
                  }, {
                    "owner_id": 7,
                    "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
                    "created_at": "2019-04-20 05:46:29",
                    "updated_at": "2019-07-08 12:31:50",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 3
                  }, {
                    "owner_id": 19,
                    "description": "Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                    "created_at": "2019-04-07 19:52:13",
                    "updated_at": "2019-09-27 06:04:55",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 24
                  }, {
                    "owner_id": 44,
                    "description": "Morbi non lectus.",
                    "created_at": "2019-02-19 06:35:43",
                    "updated_at": "2019-02-19 07:40:46",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 5
                  }, {
                    "owner_id": 88,
                    "description": "Proin at turpis a pede posuere nonummy.",
                    "created_at": "2019-04-04 10:28:59",
                    "updated_at": "2019-03-27 05:44:07",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 25
                  }, {
                    "owner_id": 14,
                    "description": "In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                    "created_at": "2020-01-03 22:05:29",
                    "updated_at": "2019-04-15 07:57:51",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 4
                  }, {
                    "owner_id": 92,
                    "description": "Ut tellus. Nulla ut erat id mauris vulputate elementum.",
                    "created_at": "2019-05-12 19:24:35",
                    "updated_at": "2019-12-09 01:07:29",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 23
                  }, {
                    "owner_id": 39,
                    "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
                    "created_at": "2019-12-30 03:26:24",
                    "updated_at": "2019-02-25 00:26:30",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 5
                  }, {
                    "owner_id": 11,
                    "description": "Pellentesque at nulla. Suspendisse potenti.",
                    "created_at": "2019-09-06 10:19:47",
                    "updated_at": "2019-08-26 22:58:40",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 6
                  }, {
                    "owner_id": 87,
                    "description": "Phasellus sit amet erat. Nulla tempus.",
                    "created_at": "2019-03-29 23:04:35",
                    "updated_at": "2019-12-09 11:24:37",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 20
                  }, {
                    "owner_id": 70,
                    "description": "Nunc purus.",
                    "created_at": "2019-12-20 22:07:28",
                    "updated_at": "2019-12-22 18:51:09",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 8
                  }, {
                    "owner_id": 88,
                    "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                    "created_at": "2019-03-20 13:48:32",
                    "updated_at": "2019-08-01 03:04:05",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 20
                  }, {
                    "owner_id": 93,
                    "description": "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
                    "created_at": "2019-12-21 08:20:49",
                    "updated_at": "2019-12-10 01:12:26",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 12
                  }, {
                    "owner_id": 35,
                    "description": "Nunc purus.",
                    "created_at": "2019-04-20 07:40:47",
                    "updated_at": "2019-05-09 07:08:03",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 20
                  }, {
                    "owner_id": 11,
                    "description": "Phasellus sit amet erat. Nulla tempus.",
                    "created_at": "2020-01-03 17:24:27",
                    "updated_at": "2019-08-09 22:00:16",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 11
                  }, {
                    "owner_id": 19,
                    "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                    "created_at": "2019-03-23 09:29:54",
                    "updated_at": "2019-08-07 01:36:23",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 4
                  }, {
                    "owner_id": 66,
                    "description": "Donec ut mauris eget massa tempor convallis.",
                    "created_at": "2019-05-13 00:22:40",
                    "updated_at": "2019-10-19 17:07:41",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 23
                  }, {
                    "owner_id": 62,
                    "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
                    "created_at": "2020-01-13 07:09:23",
                    "updated_at": "2019-06-05 12:24:24",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 16
                  }, {
                    "owner_id": 94,
                    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
                    "created_at": "2019-02-20 05:37:50",
                    "updated_at": "2019-11-13 01:27:16",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 10
                  }, {
                    "owner_id": 33,
                    "description": "Vestibulum rutrum rutrum neque.",
                    "created_at": "2019-12-21 04:21:20",
                    "updated_at": "2019-08-03 09:22:48",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 12
                  }, {
                    "owner_id": 20,
                    "description": "Duis aliquam convallis nunc.",
                    "created_at": "2019-04-10 06:21:57",
                    "updated_at": "2019-04-29 06:05:33",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 14
                  }, {
                    "owner_id": 44,
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
                    "created_at": "2019-03-29 01:38:37",
                    "updated_at": "2019-09-20 23:29:30",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 15
                  }, {
                    "owner_id": 89,
                    "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
                    "created_at": "2019-06-08 14:37:02",
                    "updated_at": "2019-09-16 07:39:56",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 16
                  }, {
                    "owner_id": 45,
                    "description": "Nulla nisl.",
                    "created_at": "2019-08-14 19:09:26",
                    "updated_at": "2019-06-27 05:56:35",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 22
                  }, {
                    "owner_id": 8,
                    "description": "In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt.",
                    "created_at": "2019-12-15 18:58:00",
                    "updated_at": "2019-09-29 19:56:31",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 10
                  }, {
                    "owner_id": 73,
                    "description": "Curabitur in libero ut massa volutpat convallis.",
                    "created_at": "2019-11-30 19:21:29",
                    "updated_at": "2019-08-19 06:55:49",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 22
                  }, {
                    "owner_id": 47,
                    "description": "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.",
                    "created_at": "2019-08-27 16:57:30",
                    "updated_at": "2019-04-20 06:09:18",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 22
                  }, {
                    "owner_id": 31,
                    "description": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
                    "created_at": "2019-11-12 08:18:16",
                    "updated_at": "2019-05-29 05:22:55",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 15
                  }, {
                    "owner_id": 56,
                    "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
                    "created_at": "2020-01-04 21:00:40",
                    "updated_at": "2019-08-19 00:45:35",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 6
                  }, {
                    "owner_id": 48,
                    "description": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.",
                    "created_at": "2019-07-17 13:11:26",
                    "updated_at": "2019-03-22 02:16:01",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 16
                  }, {
                    "owner_id": 9,
                    "description": "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
                    "created_at": "2019-10-25 01:18:20",
                    "updated_at": "2019-09-25 12:03:09",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 18
                  }, {
                    "owner_id": 19,
                    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.",
                    "created_at": "2019-03-27 22:24:08",
                    "updated_at": "2019-03-27 08:46:44",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 19
                  }, {
                    "owner_id": 16,
                    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
                    "created_at": "2019-09-16 17:27:36",
                    "updated_at": "2019-02-22 09:31:15",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 23
                  }, {
                    "owner_id": 56,
                    "description": "Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
                    "created_at": "2019-11-23 03:44:33",
                    "updated_at": "2019-06-21 12:40:19",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 9
                  }, {
                    "owner_id": 32,
                    "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                    "created_at": "2019-07-22 19:00:21",
                    "updated_at": "2019-10-14 22:47:30",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 20
                  }, {
                    "owner_id": 16,
                    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.",
                    "created_at": "2019-05-29 00:05:27",
                    "updated_at": "2019-07-19 07:59:34",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 24
                  }, {
                    "owner_id": 27,
                    "description": "Fusce consequat.",
                    "created_at": "2019-02-12 23:31:38",
                    "updated_at": "2019-06-03 08:19:05",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 5
                  }, {
                    "owner_id": 79,
                    "description": "Duis aliquam convallis nunc.",
                    "created_at": "2019-11-06 16:30:04",
                    "updated_at": "2019-02-23 12:14:20",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 5
                  }, {
                    "owner_id": 1,
                    "description": "Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
                    "created_at": "2019-08-27 03:43:54",
                    "updated_at": "2019-10-16 03:17:57",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 16
                  }, {
                    "owner_id": 48,
                    "description": "Aenean sit amet justo. Morbi ut odio.",
                    "created_at": "2019-05-30 04:14:44",
                    "updated_at": "2019-03-31 15:46:59",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 15
                  }, {
                    "owner_id": 23,
                    "description": "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    "created_at": "2019-06-10 18:27:29",
                    "updated_at": "2019-03-19 19:43:49",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 19
                  }, {
                    "owner_id": 6,
                    "description": "Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
                    "created_at": "2019-08-12 11:27:54",
                    "updated_at": "2019-04-04 10:23:33",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 3
                  }, {
                    "owner_id": 51,
                    "description": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
                    "created_at": "2019-08-25 23:45:39",
                    "updated_at": "2019-12-09 05:12:43",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 4
                  }, {
                    "owner_id": 19,
                    "description": "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
                    "created_at": "2020-01-07 13:15:32",
                    "updated_at": "2019-11-28 12:55:09",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 20
                  }, {
                    "owner_id": 59,
                    "description": "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.",
                    "created_at": "2019-07-22 10:44:09",
                    "updated_at": "2019-10-01 22:09:05",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 5
                  }, {
                    "owner_id": 30,
                    "description": "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
                    "created_at": "2019-08-08 21:21:08",
                    "updated_at": "2019-05-19 00:10:17",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 19
                  }, {
                    "owner_id": 67,
                    "description": "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
                    "created_at": "2019-05-18 07:37:17",
                    "updated_at": "2019-03-24 03:24:29",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 4
                  }, {
                    "owner_id": 94,
                    "description": "Morbi vel lectus in quam fringilla rhoncus.",
                    "created_at": "2019-05-15 03:58:45",
                    "updated_at": "2019-08-25 03:50:12",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 7
                  }, {
                    "owner_id": 48,
                    "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
                    "created_at": "2019-05-18 11:36:40",
                    "updated_at": "2019-09-10 00:34:19",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 12
                  }, {
                    "owner_id": 1,
                    "description": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                    "created_at": "2019-02-20 04:54:09",
                    "updated_at": "2019-03-16 10:15:29",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 24
                  }, {
                    "owner_id": 79,
                    "description": "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
                    "created_at": "2019-04-23 01:44:57",
                    "updated_at": "2019-02-27 08:07:06",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 6
                  }, {
                    "owner_id": 25,
                    "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
                    "created_at": "2019-05-04 11:58:41",
                    "updated_at": "2019-12-06 08:38:55",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 10
                  }, {
                    "owner_id": 56,
                    "description": "Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.",
                    "created_at": "2019-03-29 11:06:53",
                    "updated_at": "2019-07-01 18:46:08",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 8
                  }, {
                    "owner_id": 26,
                    "description": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
                    "created_at": "2019-02-22 15:26:02",
                    "updated_at": "2020-01-03 09:34:21",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 9
                  }, {
                    "owner_id": 32,
                    "description": "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
                    "created_at": "2020-01-16 12:49:49",
                    "updated_at": "2019-09-16 04:22:21",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 1
                  }, {
                    "owner_id": 36,
                    "description": "Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
                    "created_at": "2019-08-26 22:13:25",
                    "updated_at": "2019-08-19 16:08:49",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 20
                  }, {
                    "owner_id": 73,
                    "description": "Vivamus in felis eu sapien cursus vestibulum.",
                    "created_at": "2019-02-08 02:27:27",
                    "updated_at": "2019-09-28 11:27:52",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 1
                  }, {
                    "owner_id": 39,
                    "description": "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.",
                    "created_at": "2019-04-11 22:22:51",
                    "updated_at": "2019-04-29 03:51:03",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 23
                  }, {
                    "owner_id": 71,
                    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.",
                    "created_at": "2019-03-21 12:43:21",
                    "updated_at": "2019-10-07 04:05:50",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 12
                  }, {
                    "owner_id": 24,
                    "description": "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
                    "created_at": "2019-10-18 03:23:41",
                    "updated_at": "2019-04-10 09:01:20",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 10
                  }, {
                    "owner_id": 78,
                    "description": "Nulla nisl. Nunc nisl.",
                    "created_at": "2019-10-19 02:52:27",
                    "updated_at": "2019-09-04 19:01:44",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 18
                  }, {
                    "owner_id": 73,
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
                    "created_at": "2019-12-27 03:07:51",
                    "updated_at": "2019-10-14 20:32:23",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 25
                  }, {
                    "owner_id": 27,
                    "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
                    "created_at": "2019-03-24 05:07:49",
                    "updated_at": "2019-10-28 20:00:49",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 14
                  }, {
                    "owner_id": 46,
                    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
                    "created_at": "2019-06-21 04:26:34",
                    "updated_at": "2019-11-20 19:24:28",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 6
                  }, {
                    "owner_id": 36,
                    "description": "Pellentesque at nulla.",
                    "created_at": "2019-02-24 23:59:23",
                    "updated_at": "2019-12-05 02:37:17",
                    "video_url": "https://www.youtube.com/embed/LQMLFryA_7k",
                    "prompt_id": 18
                  }, {
                    "owner_id": 59,
                    "description": "Nulla ac enim.",
                    "created_at": "2019-03-14 05:06:08",
                    "updated_at": "2019-08-12 20:59:47",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 19
                  }, {
                    "owner_id": 95,
                    "description": "Aenean sit amet justo. Morbi ut odio.",
                    "created_at": "2019-10-25 08:44:22",
                    "updated_at": "2019-02-19 06:18:04",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 17
                  }, {
                    "owner_id": 24,
                    "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                    "created_at": "2019-12-19 09:03:40",
                    "updated_at": "2019-08-16 08:56:13",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 7
                  }, {
                    "owner_id": 22,
                    "description": "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
                    "created_at": "2019-09-04 14:08:24",
                    "updated_at": "2019-08-13 08:59:41",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 24
                  }, {
                    "owner_id": 14,
                    "description": "Phasellus in felis. Donec semper sapien a libero.",
                    "created_at": "2019-02-15 11:05:09",
                    "updated_at": "2019-11-11 10:16:50",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 5
                  }, {
                    "owner_id": 100,
                    "description": "Etiam faucibus cursus urna.",
                    "created_at": "2019-02-22 22:37:57",
                    "updated_at": "2019-11-24 18:57:49",
                    "video_url": "https://www.youtube.com/embed/ZkwqZfvbdFw",
                    "prompt_id": 19
                  }, {
                    "owner_id": 90,
                    "description": "Nulla tellus.",
                    "created_at": "2019-07-08 08:31:22",
                    "updated_at": "2019-10-27 01:01:20",
                    "video_url": "https://www.youtube.com/embed/13zN4-MVM9g",
                    "prompt_id": 1
                  }, {
                    "owner_id": 67,
                    "description": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                    "created_at": "2019-11-22 21:57:42",
                    "updated_at": "2019-10-19 22:02:30",
                    "video_url": "https://www.youtube.com/embed/oHg5SJYRHA0",
                    "prompt_id": 17
                  }, {
                    "owner_id": 21,
                    "description": "Sed accumsan felis.",
                    "created_at": "2019-06-13 11:42:15",
                    "updated_at": "2019-04-21 19:11:21",
                    "video_url": "https://www.youtube.com/embed/fc3c3OrpKSI",
                    "prompt_id": 16
                  }, {
                    "owner_id": 50,
                    "description": "Nunc purus. Phasellus in felis. Donec semper sapien a libero.",
                    "created_at": "2019-07-08 00:44:32",
                    "updated_at": "2019-09-23 19:11:22",
                    "video_url": "https://www.youtube.com/embed/6Gw5dK48MtI",
                    "prompt_id": 11
                  }, {
                    "owner_id": 92,
                    "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
                    "created_at": "2020-01-15 01:32:12",
                    "updated_at": "2020-01-14 02:43:54",
                    "video_url": "https://www.youtube.com/embed/ssR-RguvjHo",
                    "prompt_id": 12
                  }]);
        });
};
