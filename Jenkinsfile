pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-LTS'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/KenanRicky/gallery.git'
            }
        }
        stage('Initial Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    emailext (
                        subject: "Test Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                        body: "Tests failed in build ${env.BUILD_NUMBER}. Check console at ${env.BUILD_URL}",
                        to: "kauraricky@gmail.com"
                    )
                }
            }
        }
        stage('Deploy to Render') {
            steps {
                echo 'Deployment triggered automatically via GitHub push to Render'
                echo 'App URL: https://gallery-juep.onrender.com'
            }
            post {
                success {
                    slackSend(
                        channel: '#ricky_ip1',
                        color: 'good',
                        message: "🚀Deployment Successful! Build #${env.BUILD_NUMBER} deployed to Render: https://gallery-pxfl.onrender.com",
                        teamDomain: 'DevOps-prjz',
                        tokenCredentialId: 'slack-token',
                        botUser: true
                    )
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}