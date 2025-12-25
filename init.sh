#!/usr/bin/env bash
set -e

if [ -n "${SSH_PASSWORD:-}" ]; then
  echo "sshuser:${SSH_PASSWORD}" | chpasswd
fi

/usr/sbin/sshd

exec npm start
