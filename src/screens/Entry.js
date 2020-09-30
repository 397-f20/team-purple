import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    SectionList, Button, TouchableOpacity
} from "react-native";
import Form from "../components/Form";
import exampleData from "../../exampleData.json";
import { fonts, colors } from "../styles/all_styles";

const sectionData = exampleData.options.map((option) => ({
    title: option.title,
    info: option.info,
    data: ["scores"],
}));

const Entry = ({ route, navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Submit" />
            ),
        });
    }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 10 }}>
                <Text style={fonts.h1}>Prompt</Text>
                <Text style={[fonts.h1, { fontWeight: 'normal' }]}>What Star Wars movie are we watching?</Text>
            </View>
            <SectionList
                sections={sectionData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: "100%" }}
                keyExtractor={(index) => `${index}`}
                renderItem={({ section: { data } }) => (
                    <View style={styles.formContainer}>
                        <Form
                            initialValues={{
                                id: null,
                                meets: null,
                                title: null,
                            }}
                        >
                            {exampleData.criteria.map((item) => (
                                <View key={item} style={styles.field}>
                                    <Text style={fonts.p}>{item}</Text>
                                    <View style={styles.field__input}>
                                        <Form.Field name={item} placeholder={`${item}`} />
                                    </View>
                                </View>
                            ))}
                        </Form>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.header}>
                        <Text style={fonts.h2}>{title}</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Description")}>
                            <Text style={[fonts.h2, {fontWeight: 'normal'}]}>more</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    field: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    field__input: {
        width: '30%'
    },
    formContainer: {
        marginHorizontal: "10%",
    },
    header: {
        backgroundColor: colors.primaryColor,
        padding: 10,
        marginBottom: 20,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
});

export default Entry;
