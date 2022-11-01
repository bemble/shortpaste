package database

import (
	"fmt"
	"path"
	"shortpaste/core/config"

	log "github.com/sirupsen/logrus"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB
var inited bool = false

func Get() *gorm.DB {
	if !isInited() {
		log.Info("Initing database...")

		dbUri := path.Join(config.GetDataDirPath(), "mapping.db")
		ndb, err := gorm.Open(sqlite.Open(dbUri), &gorm.Config{})
		if err != nil {
			panic(fmt.Errorf("db error %v", err))
		}
		if err != nil {
			log.Fatal(err)
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
	log.Info("Migrating database...")
	db.AutoMigrate(&Link{})
	db.AutoMigrate(&File{})
	db.AutoMigrate(&Text{})
}
