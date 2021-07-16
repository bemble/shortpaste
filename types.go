package shortpaste

import (
	"gorm.io/gorm"
)

// App struct containing the bind address, storage path and the db connector.
type App struct {
	bind        string
	db          *gorm.DB
	storagePath string
}

// Link struct for saving the Redirect Links /l/.
type Link struct {
	ID   string `gorm:"primaryKey" json:"id" validate:"required,min=3,max=32,alphanumunicode"`
	Link string `json:"link" validate:"required,url"`
	gorm.Model
}

// File struct for saving the file uploads /f/.
type File struct {
	ID   string `gorm:"primaryKey" json:"id" validate:"required,min=3,max=32,alphanumunicode"`
	Name string `json:"name"`
	MIME string
	gorm.Model
}

// Text struct for saving the text pastes /t/.
type Text struct {
	ID          string `gorm:"primaryKey" json:"id" validate:"required,min=3,max=32,alphanumunicode"`
	Type        string `validate:"omitempty,oneof=txt md"`
	Text        string `gorm:"-" json:"text"`
	NoHighlight bool   `json:"nohighlight"`
	gorm.Model
}
