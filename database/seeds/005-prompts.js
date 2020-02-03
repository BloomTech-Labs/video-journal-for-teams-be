
exports.seed = function (knex) {
    return knex('prompts')
        .then(function () {
            return knex('prompts').insert(
                [{
                    "question": "Tell me a little about yourself.",
                    "description": "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.",
                    "team_id": "1",
                    "created_at": "2019-03-07 01:33:02",
                    "updated_at": "2019-04-22 13:16:51"
                }, {
                    "question": "Why did you decide to get into _track_ and become a _role_?",
                    "description": "Suspendisse ornare consequat lectus.",
                    "team_id": "1",
                    "created_at": "2019-06-26 23:51:56",
                    "updated_at": "2019-08-12 09:21:58"
                }, {
                    "question": "Tell me about the most recent project you worked on.  What were your responsibilities?",
                    "description": "Praesent blandit lacinia erat. Praesent blandit. Morbi porttitor lorem id ligula.",
                    "team_id": "2",
                    "created_at": "2019-10-02 12:56:37",
                    "updated_at": "2020-01-10 06:40:48"
                }, {
                    "question": "Desribe a time you were able to improve upon the design that was originally suggested.",
                    "description": "Vivamus in felis eu sapien cursus vestibulum.",
                    "team_id": "2",
                    "created_at": "2019-12-02 17:38:27",
                    "updated_at": "2019-04-15 07:09:48"
                }, {
                    "question": "Tell me about the project you are most proud of, and what your contribution was.",
                    "description": "Nam nulla.",
                    "team_id": "3",
                    "created_at": "2019-04-28 18:42:47",
                    "updated_at": "2019-05-02 23:23:41"
                }, {
                    "question": "Describe your production deployment process.",
                    "description": "Vestibulum sed magna at nunc commodo placerat.",
                    "team_id": "3",
                    "created_at": "2019-02-22 00:38:24",
                    "updated_at": "2019-04-17 08:59:32"
                }, {
                    "question": "Give an example of where you have applied your technical knowledge in a practical way.",
                    "description": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
                    "team_id": "4",
                    "created_at": "2019-10-30 18:38:07",
                    "updated_at": "2019-02-17 09:04:57"
                }, {
                    "question": "How did you manage source code?",
                    "description": "Suspendisse ornare consequat lectus.",
                    "team_id": "5",
                    "created_at": "2019-07-13 13:17:58",
                    "updated_at": "2019-08-08 15:42:27"
                }, {
                    "question": "What did you do to ensure quality in your deliverables?",
                    "description": "Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
                    "team_id": "5",
                    "created_at": "2019-05-07 22:49:44",
                    "updated_at": "2019-08-07 09:09:04"
                }, {
                    "question": "When is the last time you downloaded a utility from the internet to make your work more productive, and what was it?",
                    "description": "Nulla ac enim.",
                    "team_id": "6",
                    "created_at": "2019-08-05 23:56:57",
                    "updated_at": "2019-05-14 22:00:34"
                }, {
                    "question": "What are your biggest strengths?",
                    "description": "In quis justo. Maecenas rhoncus aliquam lacus.",
                    "team_id": "6",
                    "created_at": "2019-09-14 10:02:35",
                    "updated_at": "2019-08-26 12:09:23"
                }, {
                    "question": "What are your biggest weaknesses?",
                    "description": "Morbi quis tortor id nulla ultrices aliquet.",
                    "team_id": "7",
                    "created_at": "2019-12-23 08:29:29",
                    "updated_at": "2019-10-18 00:04:41"
                }, {
                    "question": "Out of all the other candidates, why should we hire you?",
                    "description": "Phasellus id sapien in sapien iaculis congue.",
                    "team_id": "8",
                    "created_at": "2019-12-15 03:27:38",
                    "updated_at": "2020-01-12 03:46:18"
                }, {
                    "question": "What do you consider your biggest professional achievement so far?",
                    "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum.",
                    "team_id": "9",
                    "created_at": "2019-02-22 00:36:34",
                    "updated_at": "2019-03-27 22:28:53"
                }, {
                    "question": "Why do you want this specific job in particular?",
                    "description": "Proin at turpis a pede posuere nonummy. Integer non velit.",
                    "team_id": "10",
                    "created_at": "2019-02-16 00:25:55",
                    "updated_at": "2019-07-29 20:36:44"
                }, {
                    "question": "Tell me about the last time you had a team conflict, how was it resolved?",
                    "description": "Aliquam quis turpis eget elit sodales scelerisque.",
                    "team_id": "11",
                    "created_at": "2019-07-14 22:38:47",
                    "updated_at": "2019-11-20 06:01:55"
                }, {
                    "question": "Describe your dream job.",
                    "description": "Morbi quis tortor id nulla ultrices aliquet.",
                    "team_id": "12",
                    "created_at": "2019-08-17 16:33:41",
                    "updated_at": "2019-11-16 17:25:57"
                }, {
                    "question": "What kind of work environment do you like best?",
                    "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
                    "team_id": "13",
                    "created_at": "2019-09-08 20:08:15",
                    "updated_at": "2019-09-11 08:13:17"
                }, {
                    "question": "Do you prefer to lead or follow?",
                    "description": "Pellentesque viverra pede ac diam.",
                    "team_id": "14",
                    "created_at": "2019-02-15 00:42:43",
                    "updated_at": "2019-10-08 07:55:01"
                }, {
                    "question": "Tell me about your leadership style.",
                    "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
                    "team_id": "15",
                    "created_at": "2019-11-28 04:38:08",
                    "updated_at": "2020-01-25 08:59:04"
                }, {
                    "question": "Tell me about a time when you disagreed with a decision, what did you do?",
                    "description": "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                    "team_id": "16",
                    "created_at": "2019-06-10 05:54:54",
                    "updated_at": "2019-04-24 13:18:00"
                }, {
                    "question": "Tell me how you think others would describe you.",
                    "description": "Vestibulum ac est lacinia nisi venenatis tristique.",
                    "team_id": "17",
                    "created_at": "2019-08-06 11:45:02",
                    "updated_at": "2019-09-18 04:51:11"
                }, {
                    "question": "How do you manage your own workload and work flow?",
                    "description": "Pellentesque viverra pede ac diam.",
                    "team_id": "18",
                    "created_at": "2019-08-28 20:29:54",
                    "updated_at": "2019-12-22 04:26:09"
                }, {
                    "question": "What top 3 attributes do you admire in others?",
                    "description": "Suspendisse ornare consequat lectus.",
                    "team_id": "19",
                    "created_at": "2019-03-18 18:50:56",
                    "updated_at": "2019-06-26 20:38:34"
                }, {
                    "question": "Where do you see yourself in 5 years?",
                    "description": "Nulla ac enim.",
                    "team_id": "20",
                    "created_at": "2019-02-11 23:32:04",
                    "updated_at": "2019-08-23 13:09:36"
                }]);
        });
};
