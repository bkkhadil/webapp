pipeline {
    agent any

    environment {
        REGISTRY = "registry.gitlab.com/pfe7040305/middleoffice"
        VERSION = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://gitlab.com/pfe7040305/middleoffice.git',
                credentialsId: 'gitlab-creds'
            }
        }

        stage('Build Backend') {
            when { changeset "backend/**" }
            steps {
                dir('backend/core') {
                    sh 'mvn clean package -DskipTests'
                    docker.build("${REGISTRY}/backend:${VERSION}", './docker/backend')
                }
            }
        }

        stage('Build Frontend') {
            when { changeset "frontend/**" }
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build --prod'
                    docker.build("${REGISTRY}/frontend:${VERSION}", '.')
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'gitlab-registry', 
                    usernameVariable: 'REG_USER',
                    passwordVariable: 'REG_PASS'
                )]) {
                    sh """
                    docker login -u ${REG_USER} -p ${REG_PASS} ${REGISTRY}
                    docker push ${REGISTRY}/backend:${VERSION}
                    docker push ${REGISTRY}/frontend:${VERSION}
                    """
                }
            }
        }

        stage('Deploy Staging') {
            steps {
                sshagent(['staging-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no user@staging-server "docker-compose -f /opt/middleoffice/docker-compose.yml pull && docker-compose -f /opt/middleoffice/docker-compose.yml up -d"'
                }
            }
        }
    }

    post {
        failure {
            slackSend channel: '#alerts', message: "Échec du build: ${env.BUILD_URL}"
        }
        success {
            slackSend channel: '#deploys', message: "Déploiement réussi: ${env.BUILD_URL}"
        }
    }
}