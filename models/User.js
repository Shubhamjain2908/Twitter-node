'use strict';

const Model = require('objection').Model;
const jwt = require('jsonwebtoken');
const validator = require('validator');
const ValidationError = require('objection').ValidationError;
const bcrypt = require('bcrypt');

class User extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'username'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  async comparePassword(password) {
    if (!password) {
      return false;
    }
    let pass = await bcrypt.compare(password, this.password);
    return pass;
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {

    };
  }

  async getJWT() {
    return await jwt.sign({
      userId: this.id
    }, CONFIG.jwt_encryption);
  }

  async $beforeInsert() {

    await super.$beforeInsert();

    if (!validator.isAlphanumeric(this.username || '')) {
      throw new ValidationError({
        message: "Not a valid username!",
        type: "ModelValidation",
        data: {
          message: "Please enter a valid username.",
          code: 406,
          status: "error"
        }
      })
    }

    if (!validator.isEmail(this.email || '')) {
      throw new ValidationError({
        message: "Not a valid email!",
        type: "ModelValidation",
        data: {
          message: "Please enter a valid email address.",
          code: 406,
          status: "error"
        }
      })
    }

    if (!/[^a-zA-Z]/.test(this.name)) {
      throw new ValidationError({
        message: "Not a valid name!",
        type: "ModelValidation",
        data: {
          message: "Please enter a valid name.",
          code: 406,
          status: "error"
        }
      })
    }

    let usernameExists = await this.constructor.query().select('id').where('username', this.username).first();
    let emailExists = await this.constructor.query().select('id').where('email', this.email).first();

    if (usernameExists || emailExists) {
      if (usernameExists && emailExists) {
        throw new ValidationError({
          message: "Account with this username & email already exists!",
          type: "ModelValidation",
          data: {
            status: "error",
            code: 406,
            message: "Account already exists with this username & email address!"
          }
        });
      } else if (usernameExists) {
        throw new ValidationError({
          message: "Account with this username already exists!",
          type: "ModelValidation",
          data: {
            status: "error",
            code: 406,
            message: "Account already exists with this username!"
          }
        });
      } else {
        throw new ValidationError({
          message: "Account with this email already exists!",
          type: "ModelValidation",
          data: {
            status: "error",
            code: 406,
            message: "Account already exists with this email!"
          }
        });
      }
    }

    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }

  }

  async $beforeUpdate() {
    await super.$beforeUpdate();
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  $formatJson(json, opt) {
    json = super.$formatJson(json, opt);
    json.password ? delete json.password : json;
    return json;
  }

}

module.exports = User;
