import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Form from '../components/Form';

const Entry = ({ route }) => {

    var criteria = ["Writing", "VFX", "Acting", "Music", "Action"]
    var fields = []

    for (var i = 0; i < criteria.length; i++) {
        fields.push(
            <View>
                <Text>{criteria[i]}</Text>
                <Form.Field
                    name={criteria[i]}
                    placeholder={criteria[i]}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>PROMPT</Text>
                <Text>What Star Wars movie are we watching?</Text>
                <Form
                    initialValues={{
                        id: null,
                        meets: null,
                        title: null,
                    }}>
                    {fields}

                </Form>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    field: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default Entry