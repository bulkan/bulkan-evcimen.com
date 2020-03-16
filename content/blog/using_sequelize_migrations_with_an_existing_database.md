---
title: "Using Sequelize Migrations With An Existing Database"
date: "2014-01-20"
tags: ["node.js", "sql", "mysql"]
slug: "using_sequelize_migrations_with_an_existing_database"

---

## Install

Im sure you know know how to install packages but here is the command for the sake of completeness

`npm install sequelize async`

## The first migration

First initialize the migrations structure

`sequelize --init`

Then create the initial migration, but dont edit this file as we will use it create the `SequelizeMeta` table.

`sequelize -c initial`

Create another migration

`sequelize -c create-tables`

## Dump the database

Now dump your database without the data. With _mysqldump_

`mysqldump -d --compact --compatible=mysql323 ${dbname}|egrep -v "(^SET|^/\*\!)"`.

We need to remove the lines beginning or containing `SET`

Save this dump to the **migrations** folder and name it **initial.sql**

Edit the last migration that was created to look like;

    var async = require('async')
      , fs = require('fs');

    module.exports = {
      up: function(migration, DataTypes, done) {
        var db = migration.migrator.sequelize;

        async.waterfall([
          function(cb){
            fs.readFile(__dirname + '/initial.sql', function(err, data){
              if (err) throw err;
              cb(null, data.toString());
            });
          },

          function(initialSchema, cb){
            // need to split on ';' to get the individual CREATE TABLE sql
            // as db.query can execute on query at a time
            var tables = initialSchema.split(';');

            function createTable(tableSql, doneCreate){
              db.query(tableSql).complete(doneCreate);
            }

            async.each(tables, createTable, cb);
          }
        ], done);
      },

      down: function(migration, DataTypes, done) {
        migration.showAllTables().success(function(tableNames){

          // Dont drop the SequelizeMeta table
          var tables = tableNames.filter(function(name){
            return name.toLowerCase() !== 'sequelizemeta';
          });

          function dropTable(tableName, cb){
            migration.dropTable(tableName).complete(cb);
          }

          async.each(tables, dropTable, done);
        });
      }
    }

## Please explain

On the migrations `up` function we use `async.waterfall` to orchestrate a the async calls;

* read in the `initial.sql` file
* need to split the `initial.sql` and retrieve each `CREATE TABLE` queries as `db.query` can execute on query at a time
* using `async.each` run each of these queries

On the migrations `down` function we just remove all tables that is not the `SequelizeMeta` table. For some reason `migration.dropAllTables()` remove this table and messes up the migrations. Not sure if this is the correct behavior.

Hope this helps
