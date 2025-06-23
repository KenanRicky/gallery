pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS_LTS'
    }
    
    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d1ckhi6r433s73ftjvi0?key=DmffchKG_Nc'
        RENDER_APP_URL = 'https://gallery-juep.onrender.com'
        EMAIL_RECIPIENT = 'kaburaricky@gmail.com'
        SLACK_CHANNEL = '#ricky_ip1'
    }
    
    stages {
        stage('Clone code') {
            steps {
                git branch: 'master', url: 'https://github.com/KenanRicky/gallery.git'
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    try {
                        sh 'npm test'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        emailext (
                            subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                            body: "Tests failed. Check console: ${env.BUILD_URL}console",
                            to: "${EMAIL_RECIPIENT}"
                        )
                        throw e
                    }
                }
            }
        }
        
        stage('Deploy to Render') {
            when {
                expression { currentBuild.result != 'FAILURE' }
            }
            steps {
                sh 'curl -X POST "${RENDER_DEPLOY_HOOK}"'
            }
        }
    }
    
    post {
        success {
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: 'good',
                message: ":white_check_mark: *Deployment Successful!*\n*Build:* ${env.BUILD_NUMBER}\n*Site:* ${RENDER_APP_URL}"
            )
        }
        failure {
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: 'danger',
                message: ":x: *Build Failed!*\n*Build:* ${env.BUILD_NUMBER}\n*Logs:* ${env.BUILD_URL}console"
            )
        }
    }
}
