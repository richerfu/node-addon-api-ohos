declare function requireNapiPreview(name: string, isAppModule?: boolean): any;

const binding = requireNapiPreview("example", true);

export default binding;
