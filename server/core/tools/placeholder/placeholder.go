package placeholder

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"shortpaste/core/tools/file"
	"strings"

	"github.com/sirupsen/logrus"
)

var replacers map[string]Replacer = map[string]Replacer{}

func SetReplacer(replacer Replacer) {
	replacers[replacer.Placeholder] = replacer
}

func ReplaceInFiles(rootDirectory string) {
	if _, err := os.Stat(rootDirectory); os.IsNotExist(err) {
		logrus.WithField("category", "placeholders").Warn(rootDirectory + " not found.")
		return
	}

	err := filepath.Walk(rootDirectory,
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if !info.IsDir() && !strings.HasSuffix(path, ".original") && containsPlaceHolders(path) {
				file.Copy(path, path+".original")
			}
			return nil
		})
	if err != nil {
		logrus.WithField("category", "placeholders").Fatal(err)
	}

	err = filepath.Walk(rootDirectory,
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if strings.HasSuffix(path, ".original") {
				err = replacePlaceHolders(path)
				if err != nil {
					return err
				}
			}
			return nil
		})
	if err != nil {
		logrus.WithField("category", "placeholders").Fatal(err)
	}
}

func containsPlaceHolders(path string) bool {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		logrus.Fatal(err)
	}
	contains := false
	for _, replacer := range replacers {
		contains = contains || strings.Contains(string(b), replacer.Placeholder)
	}

	return contains
}

func replacePlaceHolders(path string) error {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		logrus.Fatal(err)
	}

	result := string(b)

	for _, replacer := range replacers {
		fullReplace := replacer.Replacement
		if replacer.IsURLPath && replacer.Replacement != "/" {
			fullReplace = replacer.Replacement + "/"
		}

		if replacer.IsURLPath {
			result = strings.Replace(result, "/"+replacer.Placeholder+"/", fullReplace, -1)
			result = strings.Replace(result, "/"+replacer.Placeholder, replacer.Replacement, -1)
		} else {
			result = strings.Replace(result, replacer.Placeholder, replacer.Replacement, -1)
		}
	}

	outputPath := strings.TrimSuffix(path, ".original")
	destination, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer destination.Close()
	destination.WriteString(result)
	return nil
}
