#!groovy

@Library('kanolib') _

pipeline {
    agent {
        label 'ubuntu_18.04_with_docker'
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results.xml'
            step([$class: 'CheckStylePublisher', pattern: 'eslint.xml'])
        }
        regression {
            notify_culprits currentBuild.result
        }
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    docker.image('node:8-alpine').inside {
                        sh "yarn"
                    }
                }
            }
        }
        stage('lint') {
            steps {
                script {
                    docker.image('node:8-alpine').inside {
                        sh "yarn lint-ci"
                    }
                }
            }
        }
        stage('test') {
            steps {
                script {
                    // Use puppeteer enabled docker image
                    docker.image('kanocomputing/puppeteer').inside('--cap-add=SYS_ADMIN') {
                        // Run the Unit test
                        sh "yarn test-ci"
                    }
                }
            }
        }
    }
    options {
        // Only keep a fixed amount of builds
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }
}
