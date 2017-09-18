#!groovy

pipeline {
    agent {
        label 'win-test'
    }

    stages {
        // pulls down locally the sources for the component
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        // Install the bower dependencies of the component
        stage('install dependencies') {
            steps {
                script {
                    sh "bower --version || npm i -g bower"
                    sh "polymer --version || npm i -g polymer-cli"
                    sh "npm install -g https://github.com/marcelmeulemans/wct-junit-reporter.git"
                    sh "bower i"
                }
            }
        }

        // Lints, and tests the component
        stage('test') {
            steps {
                script {
                    sh "polymer lint"
                    sh "polymer test --local chrome"
                    junit allowEmptyResults: true, testResults: 'wct.xml'
                }
            }
        }

        stage('documentation') {
            steps {
                script {
                    // Generate the analysis.json file that will be sent to
                    // the global documentation later on
                    sh "polymer analyze > analysis.json"
                }
            }
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }
}