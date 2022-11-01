package public

import "embed"

// Embed html templates with code
//
//go:embed templates/*
var templateFS embed.FS
