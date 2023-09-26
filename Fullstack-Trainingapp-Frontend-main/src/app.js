"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var PrList_1 = require("./components/PrList");
var CreatePr_1 = require("./components/api/CreatePr");
function App() {
    var _a = (0, react_1.useState)(''), name = _a[0], setName = _a[1];
    var _b = (0, react_1.useState)(''), date = _b[0], setDate = _b[1];
    var _c = (0, react_1.useState)(''), lift = _c[0], setLift = _c[1];
    var _d = (0, react_1.useState)(''), result = _d[0], setResult = _d[1];
    return (<react_native_1.View style={styles.container}>
            <react_native_1.Text style={{ fontSize: 20, marginTop: 150 }}> Add a new personal record</react_native_1.Text>
            <react_native_1.TextInput placeholder={"Your name"} style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 30 }} onChangeText={function (name) { return setName(name); }} value={name}/>
            <react_native_1.TextInput placeholder={"Date"} style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 30 }} onChangeText={function (date) { return setDate(date); }} value={date}/>
            <react_native_1.TextInput placeholder={"Exercise"} style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 30 }} onChangeText={function (lift) { return setLift(lift); }} value={lift}/>
            <react_native_1.TextInput placeholder={"Result"} style={{ width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 30, marginBottom: 30 }} onChangeText={function (result) { return setResult(result); }} value={result}/>
            <react_native_1.View style={{ marginBottom: 30 }}>
                <react_native_1.Button title={'Add'} onPress={function () { return (0, CreatePr_1.default)(name, date, lift, result); }}/>
            </react_native_1.View>
            <PrList_1.default />
        </react_native_1.View>);
}
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
