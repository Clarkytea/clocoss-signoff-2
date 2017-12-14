'use strict';

// todo: the namespace should be in a config file
const datastore = require('@google-cloud/datastore')({ namespace: 'up723294_task_2' });

//Point to counter at namespace above in the datastore

function key(id) {
  return datastore.key(['counter', id]);
}

//Export crud routes
module.exports.list = async () => {
  let [data] = await datastore.createQuery('strings').select('name').order('name').run();
  data = data.map((val) => val.name);
  return data;
};

module.exports.get = async (id) => {
  const [data] = await datastore.get(key(id));
  if (data && data.val) return data.val;
  return '0';
};

module.exports.post = async (id, val) => {
  const [data] = await datastore.get(key(id));
  if (data && data.val) {
    try {
      // Add the newly provided int to the existing value for the corresponding ID  
    val = parseInt(val) + parseInt(data.val);
    } catch(e) {
      console.log('ERROR: Int not Parsed');
    }
  }
  // Construct and entry object to be inserted into the datastore 
  const entry = {
        key: key(id),
        data: { name: id, val },
      }
  await datastore.save(entry);
  return `${val}`;
};

module.exports.delete = async (id) => {
  const [data] = await datastore.delete(key(id));
  //checks to see the entry has been removed. If so, returns the message 'ok'
  if (data.indexUpdates > 0) {
    return 'ok';
  }
  return '0';
};

module.exports.put = (id, val) => {
  return datastore.save({ key: key(id), data: { name: id, val } });
};
