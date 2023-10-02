import Constants from 'expo-constants';
import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const BmiCalculator = () => {

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [heightUnit, setHeightUnit] = useState("cm");
    const [description, setDescription] = useState('');
    const [bmi, setBmi] = useState(null);

    const changeMeasurementSystem = () => {
        setWeight("");
        setHeight("");
        setWeightUnit((prevUnit) => (prevUnit === "kg" ? "lbs" : "kg"));
        setHeightUnit((prevUnit) => (prevUnit === "cm" ? "in" : "cm"));
    };
    
    const calculateBmi = () => {
        const weightInKg = weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) * 0.453592;
        const heightInM = heightUnit === "cm" ? parseFloat(height) / 100 : parseFloat(height) * 0.0254;
        
        const bmi = weightInKg / (heightInM * heightInM);

        const bmiResult = bmi.toFixed(1);
        setBmi(bmiResult);

        if (bmi < 18.5) {
            setDescription('You Are Underweight, Focus On Your Health!!!')
        }
        else if (bmi <24.9 ){
            setDescription('Your Body weight is Normal, Keep it up!!!')
        }
        else if (bmi <29.9 ){
            setDescription('Your Are Overweight, Start Working Out and Change Your Diet!!!')
        }
        else if (bmi >= 29.9 ){
            setDescription('Your Are Obese, Start Working Out and Change Your Diet!!! ')
        }
        return bmiResult;
    } 

    return (
        <View style={styles.container}> 
            <View style={styles.title}>
            <Text style={styles.titleText}> BMI Calculator</Text>
            </View>
            <TextInput 
                style={styles.input}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                placeholder={`Enter Weight (${weightUnit})`}
                keyboardType= "numeric"
            />
            <TextInput 
                style={styles.input}
                value={height}
                onChangeText={(text) => setHeight(text)}
                placeholder={`Enter Height (${heightUnit})`}
                keyboardType= "numeric"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={changeMeasurementSystem}
            >
                <Text style={styles.buttonText}>Switch Units</Text>
            </TouchableOpacity>

            
            <TouchableOpacity
                style={styles.button}
                onPress={calculateBmi}
            >
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            <View style={styles.resultView}>
                <Text style={styles.result}>{bmi}</Text>
                <Text style={styles.result}>{description}</Text>
            </View>
        </View>
    )
}

export default BmiCalculator

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#e0ecde'
    },
    title: {
        backgroundColor: '#2c6975',
        height:80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    titleText:{
        fontSize:30,
        color:'#fff',
        //fontweight:'bold'
    },
    input: {
        height:55,
        margin:15,
        borderWidth:1/2,
        padding:10,
        borderRadius:5,
        backgroundColor:'#cde0c9',
        fontSize:15
    },
    button:{
        height:55,
        margin:15,
        borderWidth:5,
        backgroundColor:'#68b2a0',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:20,
        color:'#fff',
        fontWeight:'bold'
    },
    resultView:{
        margin:15,
    },
    result:{
        fontSize:30,
        color:'#2c6975',
        fontWeight:'bold'
    }
});