buildProto:
	protoc --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" --js_out="import_style=commonjs,binary:./src/generated" --ts_out="service=true:./src/generated" robocup.proto
