export type MITMPayload = {
    fd: number;
    host_port: number;
    target_ip: string;
    target_port: number;
    pid: number;
};

export function create_key({
    fd,
    host_port,
    target_ip,
    target_port,
    pid,
}: MITMPayload) {
    return JSON.stringify({ pid, fd, target_ip, target_port, host_port });
}
