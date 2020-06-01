const knex = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
};

const find = () => {
  return knex
    .select("*")
    .from("schemes");
}

const findById = (id) => {
  return knex
    .select("*")
    .from("schemes")
    .where({ id: id });
}

const findSteps = (id) => {
  return knex("schemes")
    .join("steps", "schemes.id", "=", "steps.scheme_id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where({ "schemes.id": id })
    .orderBy(["scheme_name", { column: "step_number", order: "asc" }]);
}

const add = (scheme) => {
  return knex("schemes")
    .insert(scheme, "id")
    .then(id => {
      return knex("schemes")
        .select("*")
        .where({ id: id[0] });
    });
}

const addStep = (step, id) => {
  const newStep = {
    ...step,
    "scheme_id": id
  };

  return knex("steps")
    .insert(newStep, "id")
    .then(id => {
      return knex("steps")
        .select("*")
        .where({ id: id[0] });
    });
}

const update = (changes, id) => {
  return knex("schemes")
    .where({ id })
    .update(changes, "id")
    .then(() => {
      return knex("schemes")
        .select("*")
        .where({ id: id });
    });
}

const remove = (id) => {
  return knex("schemes")
    .where({ id })
    .del();
}