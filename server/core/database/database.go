package database

import (
	"fmt"
	"path"
	"shortpaste/core/config"

	"github.com/sirupsen/logrus"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var inited bool = false

func Init() {
	Get()
}

func Get() *gorm.DB {
	if !isInited() {
		logrus.WithField("category", "database").Info("Initing...")

		dbUri := path.Join(config.GetDataDirPath(), "mapping.db")
		ndb, err := gorm.Open(sqlite.Open(dbUri), &gorm.Config{})
		if err != nil {
			panic(fmt.Errorf("db error %v", err))
		}
		if err != nil {
			logrus.Fatal(err)
		}
		db = ndb

		migrate()
		inited = true
	}
	return db
}

func isInited() bool {
	return inited
}

func migrate() {
	logrus.WithField("category", "database").Info("Migrating...")
	db.AutoMigrate(&Link{})
	db.AutoMigrate(&File{})
	db.AutoMigrate(&Text{})
}
