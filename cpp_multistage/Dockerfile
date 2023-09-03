# syntax=docker/dockerfile:1

FROM gcc:latest
COPY . /src
WORKDIR /src
RUN make compile
RUN rm *.cpp Makefile

FROM debian:12-slim
#copy from first stage
COPY --from=0 /src /src     
WORKDIR /src
CMD ["./xplay"]