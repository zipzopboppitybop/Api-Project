'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://citybizlist.com/media/images/large/1581545816_90.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.officespacesny.com/wp-content/uploads/2019/11/20191114_123846-818x540.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://www.officespacesny.com/wp-content/uploads/2020/11/20201021_135613-818x540.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://commercialobserver.com/wp-content/uploads/sites/3/2018/06/buildingphoto56.jpg?quality=80&w=340",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-universal-studios-hollywood-red-carpet-arch-b.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://ktla.com/wp-content/uploads/sites/4/2022/11/Universial-studios-hollywood.jpg?w=2560&h=1440&crop=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cdn.tripster.com/travelguide/wp-content/uploads/2022/09/King-Kong-Ride-Universal-Studios-Hollywood-Los-Angeles-California.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/universal-the-simpsons-ride-exterior-802x535.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cache.undercovertourist.com/blog/2019/07/1019-universal-studios-hollywood-top-rides-hippo.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://assets.elpasoco.com/wp-content/uploads/NewsReleasePhotos/NR-2020/Demo-Derby-2017-web-1000x500.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://cdn.parkrecord.com/wp-content/uploads/sites/11/2019/08/20190803_DemolitionDerby_Samuels_12edited.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://trumbullcountyfair.com/wp-content/uploads/2019/05/IMG_0381.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/IRZUR22BSDZK6EKAVP3SHVTCDU.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://www.dailydemocrat.com/wp-content/uploads/2022/08/SATDERBY.jpg?w=1024",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-38105605-unapproved/original/ecfd68c2-b26f-4041-a740-9559894ab228.JPEG?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/88b8d245-9ef1-4e45-aa19-19ead65b39e8.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-38105605-unapproved/original/1ff8a629-b760-41fc-9ab6-ff6d45dedb79.JPEG?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-38105605-unapproved/original/b1321cd5-b544-4966-83db-d7567a674bea.JPEG?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/pro_photo_tool/Hosting-38105605-unapproved/original/a2d9cd1f-ef4c-4f01-97d5-9acbe1ad7d5e.JPEG?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Trader_Joes_in_Amherst%2C_NY_-_2018.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://media.npr.org/assets/img/2020/07/20/gettyimages-1227659423-ce6fec1dbee917c6f13649d6d25ab57f90ca5bb3.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://imengine.prod.srp.navigacloud.com/?uuid=0c118549-8a04-5c3c-a23a-deffe4bc617a&type=primary&q=72&width=1000",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.vox-cdn.com/thumbor/O0eMUZhTCiS9f1-oWp4-DteZeoM=/0x0:4841x3227/1200x800/filters:focal(1726x1199:2500x1973)/cdn.vox-cdn.com/uploads/chorus_image/image/71239301/GettyImages_492615170a.0.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://www.gannett-cdn.com/presto/2018/09/11/PMCA/dba8ab92-7034-4692-b22b-0da137ec17c7-180911_TN_TJ_Toned_0008.JPG",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/161b8fd6-a97d-41a5-ae79-2b41fc513d2d.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/556acfe5-8adb-4d5d-b497-6e9c6b4e9ae2.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/ef616a8a-e726-416a-85d8-9ff1d6fdb0e1.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/672a04d3-7cd3-4428-a0d3-ac24d3aa981f.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/b2b2b020-5b82-45ef-b1ae-a279ee8130e9.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/791ebd1a-85a1-4172-a75e-a54547f17da8.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/70c38185-f985-4b0c-aeb9-440157f903b3.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/5464a19e-563e-4c5a-b4f8-a0c813de42eb.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/05b07d76-8136-4cac-a01a-641ee8bc30b3.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/3ccd143a-d38e-4f19-89b7-4d935c0283b4.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/0893d361-6f5e-4d2a-a8b1-2cbe0b4cbdfc.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/98b0b618-82bd-433f-8c68-feb74184408a.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/d17d2dbf-36cf-490f-b253-c6914d9f58ff.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/ba2f4d0c-d542-4558-9760-132a124a8619.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/3f75edd9-d9e3-4177-9ec1-b436c5d9e339.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-47051400/original/2b9c593f-2027-4f97-a1f7-6eabd4605b5c.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/11ced846-0a9f-4057-9a20-6d2c9dba471a.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/e9a58203-5a49-42c7-aa72-f5be41a3b3d3.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/298f4683-1fbe-48bd-a7a7-5458c53388c0.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/d779ca4e-0182-4ad9-a8a2-8f4916a222f9.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/144d9f91-cc3b-4fd0-bbcb-6ba94f98ef5b.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/50f7fdb8-745e-4b21-a05c-8ffaf9faf562.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/b7975d9c-d5af-4669-93a4-3ff1097fc237.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/ee4c45e5-0e75-4106-9efe-4b0481a10e79.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/5cfac3c2-d059-45d6-aaf7-f85cb669b831.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/61db831a-2394-4502-84d8-f1ddd83c5fd0.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/f5581793-d338-4991-8be3-15bd7e5de039.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/cec09c6a-6de1-4aec-9824-fee140ac16bb.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/e95cfa52-1c1f-4ef1-b8f4-40f011732e62.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/ee5e9074-8abf-4cf0-a9aa-9dd6af809807.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-47972703/original/89a1e103-9bf3-4d24-af28-8dddbe8df836.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-47972703/original/70cbfd37-66e0-4625-98b5-c193b06a58f9.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-47972703/original/ecd368cc-2018-4394-b2f0-d084f95214ea.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-47972703/original/454fb7d6-a9d6-4e67-bc19-2689e16a777a.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-47972703/original/bb351dcc-7624-449c-b679-9b7f25b7141c.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/702a8b4d-f58d-4b9f-a892-294c80c5daac.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/75a52c70-36cf-4f30-ad55-93aa7d942afb.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/d342c373-3934-42c7-ab23-edb6011f66cf.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-31202365/original/1104a83e-682e-4cd4-ba6a-f36262d4fcaf.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/3716075a-d2d8-48fb-8f06-0078e939ae5b.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-831312747272304599/original/3a5fa94a-99b2-4bbb-ac35-d367749d98e2.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-831312747272304599/original/36ef3ef6-f1ea-4362-9893-6625a4dc187f.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-831312747272304599/original/ec8ff18f-e80b-4f81-b0f3-d2fa8f19c7fc.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-831312747272304599/original/ebc07836-86b3-4ecc-82a4-97149261e5db.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-831312747272304599/original/1c9530bf-fbc3-401a-9f06-f309445c18ea.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/49ee362b-b47f-49fa-b8c0-18a41dbd4c4d.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/1caa91ce-3a1f-4ea8-be4c-a483bdc1d750.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/21adbdb2-34f6-437f-8d68-7a217dc8b4fd.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/bb911aa2-7070-48a7-917a-62ea2425a3f1.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-20958243/original/320d601a-6bfe-41e7-ade7-0e5503391cda.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/49fc0d31-25fa-44ba-ab10-e26997a52630.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/bc0179d6-fac3-41eb-b14b-9086b8b41494.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/f3b9f853-ea7e-4395-a33d-ccb4b9eb6f67.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/19efd709-0bf2-42a3-9996-27539feb5431.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/303ef163-e93c-4e75-be4c-bfbacc25a728.jpg?im_w=720",
        preview: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {

    }, {});
  }
};
