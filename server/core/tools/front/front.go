package front

import (
	"shortpaste/core/config"
	"shortpaste/core/constants"
	"shortpaste/core/tools/placeholder"
)

func ReplacePlaceHolders() {
	// Basepath
	placeholder.SetReplacer(placeholder.Replacer{
		Placeholder: constants.PLACEHOLDER_BASE_PATH,
		Replacement: config.GetBasePath(),
		IsURLPath:   true,
	})

	// Api key
	placeholder.SetReplacer(placeholder.Replacer{
		Placeholder: constants.PLACEHOLDER_API_KEY,
		Replacement: config.GetApiKey(),
		IsURLPath:   false,
	})

	// Replace itself
	placeholder.ReplaceInFiles(config.GetPublicDir())
}
