FROM node:lts-alpine
# FROM kobza95/landing-admin-front-back


WORKDIR /app

COPY package*.json ./
RUN npm i pnpm -g

COPY admin/package*.json admin/
COPY admin/ admin/

# Not ready yet

# COPY client/package*.json client/
# COPY client/ client/

COPY server/package*.json server/
COPY server/ server/

RUN pnpm install-all
RUN pnpm build-all 

COPY admin/build/ server/public/admin/


USER node

# ENV PORT=80
ENV NODE_ENV=production
# #Mongo
# ENV MONGO_URL=mongodb+srv://server-admin:eGRfpsytzLWupACG@db-custom-admin.grvagct.mongodb.net/
# ENV DB_NAME=custom-admin
# ENV DB_NAME_TEST=custom-admin-test

# #Session and Auth

# ENV SESSION_SECRET=SuperSecret010

# ENV PRIVAT_JWT_KEY = -----BEGIN ENCRYPTED PRIVATE KEY-----MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIzB/w6XCpB3YCAggAMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBDbJ4FBcj4rZoquyiM177/SBIIE0Eggq2jpZn9I1eDP9yO1vEIKDdbrpX1RbWYTz8dlKZNFQmmRAiH4dv9EUx5O+I5eFiaskuGXdLHqKRNVsHog3YBstQ0Z6VSRABL7voCWVhEMWNePGjKXxc2qYfFAB9aTOoHUqgL0SqawFWC0u7UKWWvKlqEDD6EWQKFiwjg3BFl4h0ob8rP0Ss7RE5ZvcnVfEOxmVl0P7Q1W96bC6YoZjMyhTpswpUKuhpK3FkiyGBAUt15fQxFNV9Nf/squIrgEGzJpx8Ck3QDB1mWUkxUYW6hAbezoJUtjqg8HwT+t7OHQQu9qcXD+lrAkVEOAXmqqAhiSoVLf9cuP55319UOAkYtOWPCkYk5bDs+2V1lGTnCcUPfHzNkZhBVeZtQZ+dsrTZFJMXwnsSpby6YUW1O9T6Oj+NUVNNIKQMNYvme9vAKGjSt+bCVwvnQlBneQQO0gPXJ84xF+p8K4OL9/YEmZ9PqsTxXkxuW6kCPgiMzURxlGhxuqU2MR+xJUsx5SfZ4bOrOgQ6HWfvhV0rmoVA09thuyZuIhS4M3SdoN+FPq4acIXDawOV2BRFNKX0PLhO47uag9MV3kYTJB154SrDux3jXIEmJfo1iMrBPAr0waLVy7uoFKECn/eCDkysIp4N0pqEAkR0p0y7OufAryLbm0CWZ/9Bw/l92GLL0Ut2f1YgIVzJN0vI+9CRfglHsLSgZs1YW4uk7ZEPoAwRuq7o8b8xV6Z1Row700bm3AAaWmr6letHYdbOXgDoMXJ3z+WlwXOexMnKBc5DFdfm3NRUYWJUUQRfghqjXzOOE/shfE/CA6c6YuBLpVo64Y0Vjom3HNcwMxKGrUGRqPoEkHi9zaG/aPsE0uCS+mt7OudHYBg7tQ+pzUCHXguTQOWhnp1MSdsQS+XjjmEHCCXBN4dtHF8smMApPapoLHjGzl5PyEi9AqZw1cTGxJwsb3ovO55OVkdPm78h7iN8Fd7OlM3AoOFO948DBBCAaE51fuOv2SrHASH43z9q70omYAaitgGk/KPM6sfODP+vTLCnDGM/yf/XaryGfMKIjenvRcu+e4hyq31k6Dk1Kv/x0bRxLBXPvdxPg/q3hcjKUrswOMPWIrqDygjdCV1r1GHJGcW92SAce1bLFBJNa1AeEgBAfsxwZ51KfUKohQs0PsREc1+TgG+FnTHIZ+BfW4+Y850b3Dl7fnDy+EQNcf0VcPhejHEIv0m78E6pVpoNRlG7xIXJBtmaRwAujucHKs3qf8y3+SYSRUhnNLhorAtXtBqQYLE+GIutujH5YOHTipYeiCgGKEbsO3jkKJ8h7+ys8l5c9B6qUjwXMDSXF760nfJ5zncQWnBOEyWEIQI+dr3qHarPZaSHSXTNMzopesHZfDQXnO6BBrUh7x2UHZLuz0Y1kuH+E5UKE7KBh3xXDLYZRj22kAA7x7PhD5Q3yeK6lUBG85BfZ3MGfFcT7txETb2Mai/+tltBg+F7JyzO5Mg+VqpdKnKJBAPt6qsRVyJS3tvYagbeIbfEkcYQ5s4YM5qXvQvLYMiIdKOrG/AMUZOIgZCm9dirAfG7z/nhAYMVWXrUbkYKhNAVQxNw6uqc+OQAJtQrPaEWAGhCq5MOdhNneKnzSEQhTOiutcRjOiDB5+hh7kamN0-----END ENCRYPTED PRIVATE KEY-----


# # Admin

# ENV REACT_APP_API_BASE=https://localhost:80/v1/

# ENV REACT_APP_JWT_PUBLIC_KEY='-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA10uXjbV7PET2YJ0RFMmJPK1oK5Vs3TkuSJ+52VBqOBGrZ1t4Cvw9+3D9wMENFHsNQcbCmf4r0Kfa8uMyj4zWIuJwG2xK1oOv0l/Qfuw53rYHoqLcuyd8m5kJifJU8cZ4jz1iA1XU6qoUgMKx++gr7vMxfdF7iwOu6zVVS4BUrCo38CxsJh50frMzz+PmuF8/6OmAYRCngNiJcJHUdbhwooQOXvdOw50sj+9qy3KVtT8Hka+CvfY2lBwEdHih2OGSk4cIFeVYdb9VDqdIyObv4AH540VHZX/a+SthfcSl08+thHX9zONnzFFgZnBTfyiVfFt+yjsIYbCUWJS8ASyGjwIDAQAB-----END PUBLIC KEY-----'
# get or create https certs
CMD [ "pnpm", "start" ]


EXPOSE 80
