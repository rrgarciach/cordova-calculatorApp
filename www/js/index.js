/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /*
 TODO:
 -Reset to 0 when typing after an operation.
 -enable % button and functonaity.
 -enable -/+ button and functionality.
 -enable . button and functionality.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        valueScreen.value = app.vars.currentValue;
    },
    vars: {
        valueScreen : document.getElementById('valueScreen'),
        currentValue: 0,
        temporalValue: 0,
        operatorType: ''
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    key: function(keyValue) {
        if (valueScreen.value == 0) {
            valueScreen.value = keyValue;
        } else {
            valueScreen.value += keyValue;
        }
    },
    operation: function(operator) {
        if (operator == '=') {
            var temporalValue = 0;
            switch (app.vars.operatorType) {
                case '/':
                    temporalValue = app.vars.temporalValue;
                    app.vars.currentValue %= parseFloat(temporalValue);;
                    valueScreen.value = app.vars.currentValue;
                    break;
                case '*':
                    temporalValue = app.vars.temporalValue;
                    app.vars.currentValue *= parseFloat(temporalValue);;
                    valueScreen.value = app.vars.currentValue;
                    break;
                case '-':
                    temporalValue = app.vars.temporalValue;
                    app.vars.currentValue -= parseFloat(temporalValue);;
                    valueScreen.value = app.vars.currentValue;
                    break;
                case '+':
                    temporalValue = app.vars.temporalValue;
                    app.vars.currentValue += parseFloat(temporalValue);
                    valueScreen.value = app.vars.currentValue;
                    break;
                case '=':
                    temporalValue = valueScreen.value;
                    app.vars.currentValue += parseFloat(temporalValue);
                    valueScreen.value = app.vars.currentValue;
                    break;
            }
        } else {
            app.vars.operatorType = operator;
            app.vars.temporalValue = parseFloat(valueScreen.value);
            app.vars.currentValue = parseFloat(valueScreen.value);
            valueScreen.value = 0;
        }
    },
    clear: function() {
        app.vars.operatorType = '';
        app.vars.temporalValue = 0;
        app.vars.currentValue = 0;
        valueScreen.value = 0;
    }
};

app.initialize();